import { createContext, useContext, useReducer } from "react";

const initialState = {
  currentDiscussion: null,
  discussionsList: [],
  chatList: [],
  setCurrentDiscussion: () => {},
  setDiscussionsList: () => {},
  setChatList: () => {},
  newMessage: () => {}
}

const DiscussionContext = createContext(initialState)

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
    return {
      ...state,
      chatList: [...action.payload]
    }
  }
  if(action.type == "NEW_MESSAGE") {
    return {
      ...state,
      chatList: [...state.chatList, {...action.payload}],
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
    newMessage
  }}>
    {children}
  </DiscussionContext.Provider>
}

const useDiscussions = () => useContext(DiscussionContext)

export default useDiscussions
export {DiscussionContextProvider}