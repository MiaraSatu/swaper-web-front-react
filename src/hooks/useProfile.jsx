import { createContext, useContext, useReducer } from "react";

const initialState = {
  friends: null,
  discussions: null,
  setFriends: () => null,
  setDiscussions: () => null
}

const ProfileContext = createContext(initialState)

function profileReducer(state, action) {
  if(action.type == "SET_FRIENDS") {
    return {
      ...state,
      friends: [...action.payload]
    }
  }
  if(action.type == "SET_DISCUSSIONS") {
    return {
      ...state,
      discussions: [...action.payload]
    }
  }
  return state
}

const ProfileContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  function setFriends(friends) {
    if(friends) dispatch({type: "SET_FRIENDS", payload: friends});
  }

  function setDiscussions(discussions) {
    if(discussions) dispatch({type: "SET_DISCUSSIONS", payload: discussions})
  }

  return <ProfileContext.Provider value={{
    friends: state.friends,
    discussions: state.discussions,
    setFriends,
    setDiscussions
  }}>
    {children}
  </ProfileContext.Provider> 
}

const useProfile = () => useContext(ProfileContext)

export {ProfileContextProvider}

export default useProfile