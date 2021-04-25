import { io, Socket } from 'socket.io-client';

import { WEB_SOCKET_HOST } from '../utilities/config';

export default class SocketClient {
  socket: Socket | null;

  connect() {
    this.socket = io(WEB_SOCKET_HOST);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  emit(eventName: string, data: any) {
    console.log('emit발생');
    if (this.socket) {
      console.log('이벤트 name: ', eventName);
      this.socket.emit(eventName, data);
    }
  }

  on(eventName: string, func: () => void) {
    if (this.socket) {
      this.socket.on(eventName, func);
    }
  }
}
