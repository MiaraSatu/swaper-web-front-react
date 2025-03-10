import { useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import WebSocketService from "../services/WebSocketService";
import { apiCountUncheckedMessage } from "../services/api";
import { useAuth } from "./useAuth";

const initialState = {
  newMessages: [],
};

const WebSocketContext = createContext(initialState);

function webSocketReducer(state, action) {
  if(action.type == "SET_NEW_MESSAGES") {
    return {
      ...state,
      newMessages: [...action.payload]
    }
  }
  if(action.type == "NEW_MESSAGE") {
    return {
      ...state,
      newMessages: [...state.newMessages, {...action.payload}]
    }
  }
  return state;
}

export const WebSocketProvider = ({children}) => {
  const {user, token} = useAuth();
  const [state, dispatch] = useReducer(webSocketReducer, initialState);

  function setNewMessages(messages) {
    dispatch({type: "SET_NEW_MESSAGES", payload: messages ? messages : []});
  } 
  function handleNewMessage(message) {
    if(message) dispatch({type: "NEW_MESSAGE", payload: message});
  }

  async function fetchNewMessages() {
    
  }

  useEffect(() => {
    WebSocketService.subscribe(`/user/message/${user.id}`, (message) => {
      
    });

    return () => WebSocketService.disconnect();
  }, []);

  return (
    <WebSocketContext.Provider value={{}}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);