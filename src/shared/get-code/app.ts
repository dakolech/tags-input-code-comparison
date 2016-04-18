import './components/index.ts';

import { GithubFiles } from './services/github-files.ts';
import { codesArray } from './config.ts';
import { Injector } from './lib/injector.ts';

let allFiles = {};

const githubFiles = Injector.get(GithubFiles);
githubFiles.init(codesArray.map((item: ConfigListElement) => item.name));

githubFiles.files.subscribe((item) => {
  allFiles = item;
});

export class App {
  constructor(element) {
  }

  static init(element) {
    return new App(element);
  }
}
