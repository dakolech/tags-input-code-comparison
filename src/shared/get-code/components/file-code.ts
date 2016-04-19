import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { ShowFile } from '../services/show-file.ts';
import { Subject } from 'rxjs';

export class FileCode {
  public code: Subject<string>;

  constructor(
    private name,
    private ShowFile: ShowFile
  ) {
    this.code = this.ShowFile.get(name);
  }

  public render() {
    return `
      <div class='file-code'>
        <div subscribe='code'></div>
      </div>
    `;
  }
}
