import { createContext, useContext, useReducer } from "react";

const DiscussionContext = createContext({
  currentDiscussion: null,
  chatList: []
})

function discussionReducer(state, action) {
  if(action.type == "SET_CURRENT_DISCUSSION") {
    return {
      ...state,
      currentDiscussion: {...action.payload}
    }
  }

  return state
}

const DiscussionContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(discussionReducer, {})

  const setCurrentDiscussion = (discussion) => {
    if(discussion) dispatch({type: "SET_CURRENT_DISCUSSION", payload: discussion})
  }

  return <DiscussionContext.Provider value={{
    currentDiscussion: state.currentDiscussion,
    chatList: state.chatList,
    setCurrentDiscussion,
  }}>
    {children}
  </DiscussionContext.Provider>
}

const useDiscussions = () => useContext(DiscussionContext)

export default useDiscussions
export {DiscussionContextProvider}