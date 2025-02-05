import { createContext, useContext, useReducer } from "react"

const FriendsContext = createContext({
  friendsList: [],
  receivedRequests: [],
  sentRequests: [],
  suggestionsList: [],
  addFriendsList: () => {},
  setFriendsList: () => {},
  setRequests: () => {},
  setSuggestionsList: () => {},
  newInvitation: () => {},
  acceptRequest: () => {},
  refuseRequest: () => {},
  cancelRequest: () => {}
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
      suggestionsList: [...state.suggestionsList.map(sug => {
        if(sug.id == action.payload.receiver.id) {
          return {...action.payload.receiver}
        }
        return sug
      })]
    }
  }
  if(action.type == "ACCEPT_REQUEST") {
    return {
      ...state,
      receivedRequests: [
        ...state.receivedRequests.map((req) => {
          if(req.id == action.payload.id) {
            return {...action.payload}
          }
          return req
        })
      ],
      friendsList: [...state.friendsList, {...action.payload.sender}]
    }
  }
  if(action.type == "REFUSE_REQUEST") {
    return {
      ...state,
      receivedRequests: [
        ...state.receivedRequests.map(req => {
          if(req.sender.id == action.payload.id) {
            return {
              ...req,
              sender: {...action.payload}
            }
          }
          return req
        }) 
      ],
      receivedRequests: [...state.receivedRequests.filter((request) => request.id != action.payload.id)],
      suggestionsList: [...state.suggestionsList, {...action.payload.sender}]
    }
  }
  if(action.type == "CANCEL_REQUEST") {
    return {
      ...state,
      sentRequests: [
        ...state.sentRequests.map(req => {
          if(req.receiver.id == action.payload.id)
            return {
              ...req,
              receiver: {...action.payload}
            }
          return req
        })
      ]
    }
  }

  return state
}

const FriendsContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(friendsReducer, {
    friendsList: [],
    receivedRequests: [],
    sentRequests: [],
    suggestionsList: [],
    addFriendsList: () => {},
    setFriendsList: () => {},
    setRequests: () => {},
    setSuggestionsList: () => {},
    newInvitation: () => {},
    acceptRequest: () => {},
    refuseRequest: () => {},
    cancelRequest: () => {}
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

  function acceptRequest(request) {
    if(request) dispatch({type: "ACCEPT_REQUEST", payload: request})
  }

  function refuseRequest(request) {
    if(request) dispatch({type: "REFUSE_REQUEST", payload: request})
  }

  function cancelRequest(request) {
    if(request) dispatch({type: "CANCEL_REQUEST", payload: request})
  }

  return <FriendsContext.Provider value={{
    friendsList: state.friendsList,
    receivedRequests: state.receivedRequests,
    sentRequests: state.sentRequests,
    suggestionsList: state.suggestionsList,
    addFriendsList,
    setFriendsList,
    setRequests,
    setSuggestionsList,
    newInvitation,
    acceptRequest,
    refuseRequest,
    cancelRequest
  }}>
    {children}
  </FriendsContext.Provider>
}

const useFriends = () => useContext(FriendsContext)

export {useFriends, FriendsContextProvider}