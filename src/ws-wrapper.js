/**
 * Wrapper for WebSocket
 */
export default class WebsocketWrapper {
  constructor(connectionUrl) {
    this.connectionUrl = connectionUrl;
    this.ws = new WebSocket(connectionUrl);
    this.taskBuffer = [];
    this.jwtToken = null;

    this.RECONNECT_TIMEOUT = 5000;
  }

  executeTaskBuffer() {
    for (let i = this.taskBuffer.length - 1; i >= 0; i -= 1) {
      this.send(this.taskBuffer[i]);
      this.taskBuffer.splice(i, 1);
    }
  }

  setJwtToken(jwtValue) {
    this.jwtToken = jwtValue;
  }

  send(taskData) {
    if (!taskData.jwt_token) {
      taskData.jwt_token = this.jwtToken;
    }

    if (this.ws.readyState !== WebSocket.OPEN) {
      this.taskBuffer.push(taskData);

      return;
    }

    this.ws.send(JSON.stringify(taskData));
  }

  reconnect(callback) {
    setTimeout(() => {
      this.ws = new WebSocket(this.connectionUrl);

      callback();
    }, this.RECONNECT_TIMEOUT);
  }
};
