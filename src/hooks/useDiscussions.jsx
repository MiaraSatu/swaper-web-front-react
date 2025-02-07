import { createContext, useContext, useReducer } from "react";

const initialState = {
  currentDiscussion: null,
  discussionsList: [],
  chatList: [],
  setCurrentDiscussion: () => {},
  setDiscussionsList: () => {},
  setChatList: () => {},
  addChatList: () => {},
  newMessage: () => {}
}

const DiscussionContext = createContext(initialState)

function updateChatListGroup(chatList) {
  if(!chatList || chatList.length == 0)
    return null
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
  return chatList
}

function initializeChatListQueu(chatList) {
  const length = chatList.length
  if(!chatList || length == 0) return []
  chatList[0] = {...chatList[0], lastTop: true}
  chatList[length - 1] = {...chatList[length - 1], last: true}

  return chatList
}

function updateChatListQueu(oldChatList, newChatList) {
  oldChatList = oldChatList.map(chat => {
    if(chat.lastTop) return {...chat, lastTop: false, last: false}
    return {...chat, last: false}
  })
  newChatList[0] = {...newChatList[0], lastTop: true}
  return [...newChatList, ...oldChatList]
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
      chatList: [...chats]
    }
  }
  if(action.type == "ADD_CHAT_LIST") {
    const chats = updateChatListGroup(updateChatListQueu(state.chatList, action.payload))
    return {
      ...state,
      chatList: chats
    }
  }
  if(action.type == "NEW_MESSAGE") {
    const chats = updateChatListGroup([...state.chatList, action.payload])
    return {
      ...state,
      chatList: [...chats],
      discussionsList: [
        {...action.payload},
        ...state.discussionsList.filter(discussion => {
          return !((discussion.sender.id == action.payload.sender.id && discussion.receiver.id == action.payload.receiver.id) || 
          (discussion.sender.id == action.payload.receiver.id && discussion.receiver.id == action.payload.sender.id))
        })
      ]
    }
  }

  return state
}

const DiscussionContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(discussionReducer, initialState)

  const setCurrentDiscussion = (discussion) => {
    if(discussion) dispatch({type: "SET_CURRENT_DISCUSSION", payload: discussion})
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

  return <DiscussionContext.Provider value={{
    currentDiscussion: state.currentDiscussion,
    discussionsList: state.discussionsList,
    chatList: state.chatList,
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