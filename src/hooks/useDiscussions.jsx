import { createContext, useContext, useEffect, useReducer } from "react";
import AppService from "../services/AppService";
import { useWebSocket } from "./useWebSocket";

const initialState = {
  currentDiscussion: null,
  discussionsList: [],
  chatList: [],
  reactivityStatus: null,
  setCurrentDiscussion: () => {},
  setDiscussionsList: () => {},
  setChatList: () => {},
  addChatList: () => {},
  newMessage: () => {}
}

const DiscussionContext = createContext(initialState)

// chatListGroup: manages [start: boolean, end: boolean] keys
// chatListQueu: manages [last: boolean, top: boolean, lastTop: boolean] keys

function updateChatListGroup(chatList) {
  if(!chatList || chatList.length == 0)
    return []
  chatList = [...chatList.map(chat => ({...chat, start: false, end: false}))]
  let owner = chatList[0].sender
  const length = chatList.length
  chatList[0] = {...chatList[0], start: true}
  for(let i = 0; i < length-1; i++) {
    if(chatList[i+1].sender.id != owner.id) {
      chatList[i] = {...chatList[i], end: true}
      chatList[i+1] = {...chatList[i+1], start: true}
      owner = chatList[i+1].sender
    }
  }
  return AppService.mergeDuplicated(chatList)
}

function initializeChatListQueu(chatList) {
  const length = chatList.length
  if(!chatList || length == 0) return []
  chatList[0] = {...chatList[0], head: true}
  chatList[length - 1] = {...chatList[length - 1], last: true}
  
  return chatList
}

function updateChatListQueu(chatList, paginationLimit = 10) {
  const chatLen = chatList.length
  if(!chatList || chatLen == 0) return []
  chatList = chatList.map(chat => {
    // if(chat.last) return {...chat, last: false, lastTop: false}
    return {...chat, last: false, lastTop: false, head: false}
  })
  const resteInLastPage = parseInt(chatList.length % paginationLimit)
  const lastTopIndex = (resteInLastPage > 0) ? resteInLastPage : paginationLimit
  if(chatLen > paginationLimit) 
    chatList[lastTopIndex] = {...chatList[lastTopIndex], lastTop: true}
  chatList[0] = {...chatList[0], head: true}
  return chatList
}

function updateChatListQueuOnNewChat(chats, chat) {
  chats = updateChatListQueu(chats)
  return updateChatListGroup([...chats, {...chat, last: true}]);
}

function isCompatible(subject, message) {
  if(!subject || !message) return false;
  if(!subject.email && (message.type == "inbox") && (subject.id == message.boxReceiver.id) ) {
    return true;
  }
  if(subject.email && (message.type == "sample") && (subject.id == message.sender.id || subject.id == message.receiver.id)) {
    return true;
  }
  return false;
}

function isMessageCompatible(lastMessage, newMessage) {
  if(!lastMessage || !newMessage || lastMessage.type != newMessage.type) return false;
  // for same type case [sample or inbox]
  if(lastMessage.type == "sample") {
    return ((lastMessage.sender.id == newMessage.sender.id) && (lastMessage.receiver.id == newMessage.receiver.id))
          || ((lastMessage.sender.id == newMessage.receiver.id) && (lastMessage.receiver.id == newMessage.sender.id)); 
  }
  return (lastMessage.boxReceiver.id == newMessage.boxReceiver.id);
}

function discussionReducer(state, action) {
  if(action.type == "SET_CURRENT_DISCUSSION") {
    return {
      ...state,
      currentDiscussion: {...action.payload}
    }
  }
  if(action.type == "SET_DISCUSSIONS_LIST") {
    return {
      ...state,
      discussionsList: [...action.payload]
    }
  }
  if(action.type == "SET_CHAT_LIST") {
    const chats = updateChatListGroup(initializeChatListQueu(action.payload))
    return {
      ...state,
      chatList: [...chats],
      reactivityStatus: "lastMessage",
      discussionsList: [...state.discussionsList.map(discussion => {
        if(!state.currentDiscussion.email && discussion.type == "inbox") {// inbox
          if(state.currentDiscussion.id == discussion.id) {
            return {...discussion, uncheckCount: 0, unreadCount: 0}
          }
        } else if(state.currentDiscussion.email && discussion.type == "sample") { // sample
          if(discussion.sender.id == state.currentDiscussion.id || discussion.receiver.id == state.currentDiscussion.id) {
            return {...discussion, uncheckCount: 0, unreadCount: 0}
          } 
        }
        return discussion
      })]
    }
  }
  if(action.type == "ADD_CHAT_LIST") {
    const chats = updateChatListGroup(updateChatListQueu([...action.payload, ...state.chatList]))
    return {
      ...state,
      chatList: [...chats],
      reactivityStatus: "lastTopMessage"
    }
  }
  if(action.type == "NEW_MESSAGE") {
    const behovetoCurrentDiscussion = isCompatible(state.currentDiscussion, action.payload);
    const chats = behovetoCurrentDiscussion ? updateChatListQueuOnNewChat(state.chatList, action.payload) : state.chatList;
    const newChat = (state.currentDiscussion.id == action.payload.sender.id 
      || (action.payload.receiver && state.currentDiscussion.id == action.payload.receiver.id)
      || (action.payload.boxReceiver && state.currentDiscussion.id == action.payload.boxReceiver.id)) 
      ? {...action.payload, unreadCount: 0} 
      : {...action.payload};
    return {
      ...state,
      chatList: chats,
      discussionsList: [
        newChat,
        ...state.discussionsList.filter(discussion => {
          return !isMessageCompatible(discussion, action.payload);
        })
      ],
      reactivityStatus: "lastMessage"
    }
  }

  return state
}

const DiscussionContextProvider = ({children}) => {
  const {forConsumer, setActiveConsumer} = useWebSocket();
  const [state, dispatch] = useReducer(discussionReducer, initialState)

  const setCurrentDiscussion = (discussion) => {
    if(discussion) {
      dispatch({type: "SET_CURRENT_DISCUSSION", payload: discussion});
    }
  }

  const setDiscussionsList = (discussions) => {
    if(discussions) dispatch({type: "SET_DISCUSSIONS_LIST", payload: discussions})
  }

  const setChatList = (chats) => {
    if(chats) dispatch({type: "SET_CHAT_LIST", payload: chats})
  }

  const addChatList = (chats) => {
    if(chats) dispatch({type: "ADD_CHAT_LIST", payload: chats})
  }

  const newMessage = (message) => {
    if(message) dispatch({type: "NEW_MESSAGE", payload: message})
  }

  useEffect(() => {
    if(forConsumer) {
      newMessage(forConsumer);
    }
  }, [forConsumer]);

  useEffect(() => {
    setActiveConsumer(true);
    return () => setActiveConsumer(false);
  }, []);

  return <DiscussionContext.Provider value={{
    currentDiscussion: state.currentDiscussion,
    discussionsList: state.discussionsList,
    chatList: state.chatList,
    reactivityStatus: state.reactivityStatus,
    setCurrentDiscussion,
    setDiscussionsList,
    setChatList,
    addChatList,
    newMessage
  }}>
    {children}
  </DiscussionContext.Provider>
}

const useDiscussions = () => useContext(DiscussionContext)

export default useDiscussions
export {DiscussionContextProvider}