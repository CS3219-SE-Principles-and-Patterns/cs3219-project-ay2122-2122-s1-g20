import io from "socket.io-client";

export const socket = io(
  "//internal-studybuddy-alb-69068856.ap-southeast-1.elb.amazonaws.com",
  {
    transports: ["websocket"],
    upgrade: false,
    pingInterval: 1000 * 60 * 5,
    pingTimeout: 1000 * 60 * 3,
    //forceNew: true,
    reconnection: true,
  }
);
