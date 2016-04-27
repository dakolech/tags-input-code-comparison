import './components/index.ts';
import  './routes.ts';

import { GetFiles } from './services/get-files.ts';
import { ShowFile } from './services/show-file.ts';
import { codesArray } from './config.ts';
import { Inject } from './lib/injector.ts';
import { Router } from './lib/router.ts';

const io = require('socket.io-client');
const socket = io();

export class App {
  @Inject(GetFiles)
  private GetFiles: GetFiles;
  @Inject(ShowFile)
  private ShowFile: ShowFile;

  constructor(
    private codesArray,
    private socket
  ) {
    const namesArray = this.codesArray.map((item: ConfigListElement) => item.name);
    this.GetFiles.init(this.socket, namesArray);
    this.ShowFile.init(namesArray);
  }

  static init(element) {
    return new App(codesArray, socket);
  }
}
