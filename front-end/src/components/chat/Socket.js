import io from "socket.io-client";

export const socket = io(
  "wss://63dubl8nb5.execute-api.ap-southeast-1.amazonaws.com/production",
  {
    transports: ["websocket"],
    upgrade: false,
    pingInterval: 1000 * 60 * 5,
    pingTimeout: 1000 * 60 * 3,
    //forceNew: true,
    reconnection: true,
  }
);
