import {Client} from "@stomp/stompjs";
import SockJs from "sockjs-client";

class WebSocketService {
  constructor() {
    this.client = null;
    this.subscriptions = new Map();
  }

  connect = (onConnectCallBack) => {
    if(this.client.activate) {
      if(onConnectCallBack) onConnectCallBack();
    }
    this.client = new Client({
      webSocketFactory: new SockJs("http://localhost:8080/ws"),
      reconnectDelay: 5000,
      onConnect: () => {
        if(onConnectCallBack) onConnectCallBack();
      },
      onStompError: (frame) => {
        console.log("STOMP ERROR: ", frame);
      },
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
      }
    })
    this.client.active();
  }

  subscribe = (destination, callBack) => {
    if(this.client && this.client.connected){
      this.client.subscribe(destination, (message) => {
        callBack(JSON.parse(message.body));
      })
    } else {
      console.log("Try to subscribe in a deconnected websocket");
    }
  }

  send = (destination, payload) => {
    if(this.client && this.client.connected) {
      this.client.publish({destination, body: JSON.stringify(payload)});
    } else {
      console.log("Websocket not connected")
    }
  }

  disconnect = () => {
    if(this.client) {
      this.client.deactivate();
    }
  }
}

export default new WebSocketService();