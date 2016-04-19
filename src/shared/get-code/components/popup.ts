import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { FilesList } from './files-list.ts';
import { FileCode } from './file-code.ts';
import { ShowFile } from '../services/show-file.ts';

require('./popup.scss');

export class PopUp {
  constructor(
    private filesArray: CodeFile[]
  ) {
  }

  public render() {
    const filesContainer = this.filesArray.map((item, index) =>
      `<files-list id='file${index}'></files-list>
      <file-code name='${item.name}'></file-code>`
    );
    return `
      <div class='popup'>
        ${filesContainer.renderFlat()}
        Popup
      </div>
    `;
  }

  public afterRender() {
    this.filesArray.forEach((item, index) => {
      Component.create(`files-list#file${index}`, new FilesList(this.filesArray[index], Injector.get(ShowFile)));
      Component.create(`file-code[name='${item.name}']`, new FileCode(item.name, Injector.get(ShowFile)));
    });
  }
}
