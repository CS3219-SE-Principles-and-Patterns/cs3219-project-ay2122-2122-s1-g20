import io from "socket.io-client";

export const socket = io("http://localhost:9000", {
  transports: ["websocket"],
  upgrade: false,
  pingInterval: 1000 * 60 * 5,
  pingTimeout: 1000 * 60 * 3,
  //forceNew: true,
  reconnection: true,
});
