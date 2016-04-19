import './components/index.ts';

import { GithubFiles } from './services/github-files.ts';
import { ShowFile } from './services/show-file.ts';
import { codesArray } from './config.ts';
import { Injector } from './lib/injector.ts';

export class App {
  constructor(
    private codesArray,
    private GithubFiles: GithubFiles,
    private ShowFile: ShowFile
  ) {
    const namesArray = this.codesArray.map((item: ConfigListElement) => item.name);
    this.GithubFiles.init(namesArray);
    this.ShowFile.init(namesArray);
  }

  static init(element) {
    return new App(codesArray, Injector.get(GithubFiles), Injector.get(ShowFile));
  }
}
