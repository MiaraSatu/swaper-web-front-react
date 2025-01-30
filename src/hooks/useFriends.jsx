import { createContext, useContext, useReducer } from "react"

const FriendsContext = createContext({
  friendsList: [],
  receivedRequests: [],
  sentRequests: [],
  refusedRequests: [],
  suggestionsList: [],
  addFriendsList: () => {},
  setFriendsList: () => {},
  setRequests: () => {},
  setSuggestionsList: () => {},
  newInvitation: () => {}
})

const friendsReducer = (state, action) => {
  // FRIENDS_LIST
  if(action.type == "SET_FRIENDS_LIST") {
    return {
      ...state,
      friendsList: [...action.payload]
    }
  }
  if(action.type == "ADD_FRIENDS_LIST") {
    console.log([...action.payload])
    return {
      ...state,
      friendsList: [...state.friendsList,...action.payload]
    }
  }
  // RECEIVED REQUESTS
  if(action.type == "SET_RECEIVED_REQUESTS") {
    return {
      ...state,
      receivedRequests: [...action.payload]
    }
  }
  if(action.type == "ADD_RECEIVED_REQUESTS") {
    return {
      ...state,
      receivedRequests: [...state.receivedRequests, ...action.payload]
    }
  }
  // SENT REQUESTS
  if(action.type == "SET_SENT_REQUESTS") {
    return {
      ...state,
      sentRequests: [...action.payload]
    }
  }
  if(action.type == "ADD_SENT_REQUESTS") {
    return {
      ...state,
      sentRequests: [...state.sentRequests, ...action.payload]
    }
  }
  // REFUSED REQUESTS
  if(action.type == "SET_REFUSED_REQUESTS") {
    return {
      ...state,
      refusedRequests: [...action.payload]
    }
  }
  if(action.type == "ADD_REFUSED_REQUESTS") {
    return {
      ...state,
      refusedRequests: [...state.refusedRequests, ...action.payload]
    }
  }
  if(action.type == "SET_SUGGESTIONS_LIST") {
    return {
      ...state,
      suggestionsList: [...action.payload]
    }
  }
  if(action.type == "ADD_SUGGESTIONS_LIST") {
    return {
      ...state,
      suggestionsList: [...state.suggestionsList, ...action.payload]
    }
  }
  if(action.type == "NEW_INVITATION") {
    return {
      ...state,
      sentRequests: [{...action.payload},...state.sentRequests]
    }
  }

  return state
}

const FriendsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(friendsReducer, {
    friendsList: [],
    receivedRequests: [],
    sentRequests: [],
    refusedRequests: [],
    suggestionsList: [],
    addFriendsList: () => {},
    setFriendsList: () => {},
    setRequests: () => {},
    setSuggestionsList: () => {},
    newInvitation: () => {}
  })

  function addFriendsList(list) {
    dispatch({type: "ADD_FRIENDS_LIST", payload: list})
  }

  function setFriendsList(list) {
    dispatch({type: "SET_FRIENDS_LIST", payload: list})
  }

  function setRequests(filter, list, erase = false) {
    let ucFilter = filter.toUpperCase()
    let type = (erase ? "SET_" : "ADD_") + ucFilter +"_REQUESTS"
    dispatch({type: type, payload: list})
  }

  function setSuggestionsList(list, erase = false) {
    if(erase)
      dispatch({type: "SET_SUGGESTIONS_LIST", payload: list})
    else 
      dispatch({type: "ADD_SUGGESTIONS_LIST", payload: list})
  }

  function newInvitation(invitation) {
    if(invitation != null) {
      dispatch({type: "NEW_INVITATION", payload: invitation})
    }
  }

  return <FriendsContext.Provider value={{
    friendsList: state.friendsList,
    receivedRequests: state.receivedRequests,
    sentRequests: state.sentRequests,
    refusedRequests: state.refusedRequests,
    suggestionsList: state.suggestionsList,
    addFriendsList,
    setFriendsList,
    setRequests,
    setSuggestionsList,
    newInvitation
  }}>
    {children}
  </FriendsContext.Provider>
}

const useFriends = () => useContext(FriendsContext)

export {useFriends, FriendsContextProvider}