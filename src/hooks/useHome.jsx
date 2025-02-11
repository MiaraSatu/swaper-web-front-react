import { createContext, useContext, useReducer } from "react";

const initialState = {
  newMessageCount: 0,
  setNewMessageCount: () => null
}

const HomeContext = createContext(initialState)

function homeReducer(state, action) {
  if(action.type == "SET_NEW_MESSAGE_COUNT") {
    return {
      ...state,
      newMessageCount: action.payload
    }
  }

  return state
}

const HomeContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(homeReducer, initialState)

  const setNewMessageCount = (count) => {
    if(count !== null) dispatch({type: "SET_NEW_MESSAGE_COUNT", payload: count})
  }

  return <HomeContext.Provider value={{
    newMessageCount: state.newMessageCount,
    setNewMessageCount
  }}>
    {children}
  </HomeContext.Provider>
}

const useHome = () => useContext(HomeContext)

export default useHome
export {HomeContextProvider}