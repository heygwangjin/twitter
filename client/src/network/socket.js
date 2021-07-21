import socket from "socket.io-client";

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on("connect_error", (err) => {
      console.log("socket error", err.message);
    });
  }

  onSync(event, callback) {
    // 연결되지 않았을 때만 연결
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }
}
