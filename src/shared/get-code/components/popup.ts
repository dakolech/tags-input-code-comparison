import { Component, DOMComponent } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { FilesList } from './files-list.ts';
import { ShowFile } from '../services/show-file.ts';
import { codesArray } from '../config.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { FileCode } from './file-code.ts';

require('./popup.scss');

export class PopUp extends DOMComponent {
  private filesArray = [];

  constructor(
    private CompareService: CompareService,
    public ShowPopup: ShowPopup
  ) {
    super();
    this.CompareService.files.subscribe((files) => {
      this.filesArray = files;
      this.reRender();
    })
    this.ShowPopup.push(true);
    // const url = '/compare/' + this.filesArray.map((obj) => obj.name).join('-');
    // window.history.pushState(null, '', url);
  }

  public render() {
    const filesContainer = this.filesArray
      .map((item, index) =>
        `<div class='container'>
          <files-list class='files-list' id='file${index}'></files-list>
          <file-code class='file-code' name='${item.name}'></file-code>
        </div>`
      );
    return `
      <div class='popup'>
        ${filesContainer.join('')}
      </div>
    `;
  }

  public afterRender() {
    this.filesArray
      .forEach((item, index) => {
        Component.create(`files-list#file${index}`,
          new FilesList(this.filesArray[index], Injector.get(ShowFile), codesArray));
        Component.create(`file-code[name='${item.name}']`, new FileCode(item.name, Injector.get(ShowFile)));
      });
  }
}

// Component.create('pop-up', new PopUp(Injector.get(CompareService), Injector.get(ShowPopup)));

