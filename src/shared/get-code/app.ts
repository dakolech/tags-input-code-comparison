import './components/index.ts';

import { GetFiles } from './services/get-files.ts';
import { ShowFile } from './services/show-file.ts';
import { codesArray } from './config.ts';
import { Injector } from './lib/injector.ts';

const io = require('socket.io-client');
const socket = io();

export class App {
  constructor(
    private codesArray,
    private GetFiles: GetFiles,
    private ShowFile: ShowFile,
    private socket
  ) {
    const namesArray = this.codesArray.map((item: ConfigListElement) => item.name);
    this.GetFiles.init(this.socket, namesArray);
    this.ShowFile.init(namesArray);
  }

  static init(element) {
    return new App(codesArray, Injector.get(GetFiles), Injector.get(ShowFile), socket);
  }
}
