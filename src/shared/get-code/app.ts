import './components/index.ts';

import { Files } from './github/files.ts';
import { codesArray } from './config.ts';


const object = new Files(codesArray.map((item: ConfigListElement) => item.name));
let allFiles = {};

object.files.subscribe((item) => {
  allFiles = item;
});

export class App {
  constructor(element) {
  }

  static init(element) {
    return new App(element);
  }
}
