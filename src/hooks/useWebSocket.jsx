import { useContext, useReducer } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import WebSocketService from "../services/WebSocketService";
import { useAuth } from "./useAuth";

const initialState = {
  newMessages: [],
  forConsumer: null,
  hasActiveConsumer: false,
  setActiveConsumer: (boolean) => null
};

const WebSocketContext = createContext(initialState);

function webSocketReducer(state, action) {
  if(action.type == "SET_NEW_MESSAGES") {
    return {
      ...state,
      newMessages: [...action.payload]
    }
  }
  if(action.type == "NEW_MESSAGE_HANDLED") {
    if(state.hasActiveConsumer) {
      return {
        ...state, 
        forConsumer: {...action.payload}
      }
    }
    return {
      ...state,
      newMessages: [...state.newMessages, {...action.payload}]
    }
  }
  if(action.type == "SET_ACTIVE_CONSUMER") {
    console.log("payload is", action.payload);
    return {
      ...state,
      hasActiveConsumer: action.payload
    }
  }
  return state;
}

export const WebSocketProvider = ({children}) => {
  const {user, token} = useAuth();
  const [state, dispatch] = useReducer(webSocketReducer, initialState);

  function handleNewMessage(message) {
    dispatch({type: "NEW_MESSAGE_HANDLED", payload: message});
  }
  function setNewMessages(messages) {
    dispatch({type: "SET_NEW_MESSAGES", payload: messages ? messages : []});
  }
  function setActiveConsumer(hasConsumer) {
    dispatch({type: "SET_ACTIVE_CONSUMER", payload: hasConsumer});
  }

  useEffect(() => {
    WebSocketService.connect(() => {
      WebSocketService.subscribe(`/user/message/${user.id}`, (message) => {
        handleNewMessage(message);
      });
    })

    return () => WebSocketService.disconnect();
  }, []);

  return (
    <WebSocketContext.Provider value={{
      newMessages: state.newMessages,
      forConsumer: state.forConsumer,
      hasActiveConsumer: state.hasActiveConsumer,
      setActiveConsumer,
      // consumerSubject: state.consumerSubject,
      // setConsumerSubject,
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export const useWebSocket = () => useContext(WebSocketContext);