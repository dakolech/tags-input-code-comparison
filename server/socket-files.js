'use strict';

const fsM = require('fs');
const pathM = require('path');

class SocketFiles {
  constructor(socket, fsModule, pathModule) {
    this.socket = socket;
    this.fs = fsModule;
    this.path = pathModule;
    this.srcPath = '../src/';

    this.socket.on('getFiles', (data) => {
      this.getFiles(data);
    });
  }

  getFiles(data) {
    this.readDirectory(this.srcPath, data);
  }

  readDirectory(path, name) {
    this.fs.readdir(this.path.join(__dirname, path, name), (err, files) => {
      files.forEach((item) => {
        !!~item.indexOf('.') ? this.readFile(path + name, `/${item}`) : this.readDirectory(path + name, `/${item}`);
      });
    });
  }

  readFile(path, name) {
    this.fs.readFile(this.path.join(__dirname, path, name), 'utf8', (err, file) => {
      this.socket.emit('files', {
        content: file,
        name: name.slice(1),
        path: path.slice(3) + name
      });
    });
  }
}

module.exports = {
  init: (socket) => {
    return new SocketFiles(socket, fsM, pathM);
  }
};
