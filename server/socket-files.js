'use strict';

class SocketFiles {
  constructor(socket) {
    this.socket = socket;

    this.socket.on('getFiles', (data) => {
      this.getFiles(data);
    });
  }

  getFiles(data) {
    console.log(data);
  }
}

module.exports = {
  init: (socket) => {
    return new SocketFiles(socket);
  }
};
