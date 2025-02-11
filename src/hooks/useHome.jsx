import { createContext, useContext, useReducer } from "react";

const initialState = {
  unreadMessageCount: 0,
  uncheckedMessageCount: 0,
  setUnreadMessageCount: () => null,
  setUncheckedMessageCount: () => null
}

const HomeContext = createContext(initialState)

function homeReducer(state, action) {
  if(action.type == "SET_UNREAD_MESSAGE_COUNT") {
    return {
      ...state,
      unreadMessageCount: action.payload
    }
  }
  if(action.type == "SET_UNCHECKED_MESSAGE_COUNT") {
    return {
      ...state,
      uncheckedMessageCount: action.payload
    }
  }

  return state
}

const HomeContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(homeReducer, initialState)

  const setUnreadMessageCount = (count) => {
    if(count !== null) dispatch({type: "SET_UNREAD_MESSAGE_COUNT", payload: count})
  }

  const setUncheckedMessageCount = (count) => {
    if(count !== null) dispatch({type: "SET_UNCHECKED_MESSAGE_COUNT", payload: count})
  }

  return <HomeContext.Provider value={{
    unreadMessageCount: state.unreadMessageCount,
    uncheckedMessageCount: state.uncheckedMessageCount,
    setUnreadMessageCount,
    setUncheckedMessageCount,
  }}>
    {children}
  </HomeContext.Provider>
}

const useHome = () => useContext(HomeContext)

export default useHome
export {HomeContextProvider}