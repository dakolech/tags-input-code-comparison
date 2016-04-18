import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { FilesList } from './files-list.ts';

require('./popup.scss');

export class PopUp {
  constructor(
    private filesArray: CodeFile[]
  ) {
    console.log(filesArray);
  }

  public render() {
    const filesContainer = this.filesArray.map((item, index) => `
      <files-list id='file${index}'></files-list>
    `);
    return `
      <div class='popup'>
        ${filesContainer.reduce((prev, curr) => prev + curr, '')}
        Popup
      </div>
    `;
  }

  public afterRender() {
    this.filesArray.forEach((item, index) =>
      Component.create(`files-list#file${index}`, new FilesList(this.filesArray[index]));
    );
  }

}
