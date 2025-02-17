import { createContext, useContext, useReducer } from "react";

const initialState = {
  results: [],
  send: () => null,
  accept: () => null,
  refuse: () => null,
  remove: () => null,
  cancel: () => null,
  setResults: () => null
}

const SearchContext = createContext(initialState)

function searchReducer(state, action) {
  if(action.type == "SET_RESULTS") {
    return {
      ...state,
      results: [...action.payload]
    }
  }

  if(action.type == "SEND") {
    return {
      ...state,
      results: [...state.results.map(user => {
        if(user.id == action.payload.id) return {...user, friendStatus: "sent"}
        return user
      })]
    }
  }

  if(action.type == "ACCEPT") {
    return {
      ...state,
      results: [...state.results.map(user => {
        if(user.id == action.payload.id) return {...user, friendStatus: "friend"}
        return user
      })]
    }
  }
  if(action.type == "REFUSE") {
    return {
      ...state,
      results: [...state.results.map(user => {
        if(user.id == action.payload.id) return {...user, friendStatus: "none"}
        return user
      })]
    }
  }
  if(action.type == "REMOVE") {
    return {
      ...state,
      results: [...state.results.map(user => {
        if(user.id == action.payload.id) return {...user, friendStatus: "none"}
        return user
      })]
    }
  }

  if(action.type == "CANCEL") {
    return {
      ...state,
      results: [...state.results.map(user => {
        if(user.id == action.payload.id) return {...user, friendStatus: "none"}
        return user
      })]
    }
  }

  return state
}

const SearchContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(searchReducer, initialState)

  function setResults(results) {
    if(results) dispatch({type: "SET_RESULTS", payload: results})
  }

  function send(user) {
    if(user) dispatch({type: "SEND", payload: user});
  }

  function accept(user) {
    if(user) dispatch({type: "ACCEPT", payload: user});
  }
  function refuse(user) {
    if(user) dispatch({type: "REFUSE", payload: user});
  }
  function remove(user) {
    if(user) dispatch({type: "REMOVE", payload: user});
  }
  function cancel(user) {
    if(user) dispatch({type: "CANCEL", payload: user});
  }

  return <SearchContext.Provider value={{
    results: state.results,
    send,
    accept,
    refuse,
    remove,
    cancel,
    setResults
  }}>
    {children}
  </SearchContext.Provider>
}

const useSearch = () => useContext(SearchContext)

export default useSearch
export {SearchContextProvider}