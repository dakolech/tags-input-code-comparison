import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { ShowFile } from '../services/show-file.ts';

require('./files-list.scss');

export class FilesList {
  private name: string;

  constructor(
    private filesObject,
    private ShowFile: ShowFile,
    private codesArray
  ) {
    this.name = filesObject.name;
  }

  public showFile(event) {
    const target = event.currentTarget;
    const elementName = target.getAttribute('name');
    const sourceCode = this.findSourceCode(elementName, this.filesObject);

    this.addRemSelectClass(target);
    this.ShowFile.get(this.name).next(sourceCode);
  }

  public render() {
    function generateRecursive(obj: Object): Array<Object> {
      return Object.keys(obj)
        .filter((key) => obj.hasOwnProperty(key) && key !== 'name')
        .map((key) => {
          if (!!~key.indexOf('.')) {
            return `<li class='file' on-click='showFile' name='${key}'>${key}</li>`;
          } else {
            return `
              <ul class='directory'>
                ${key}
                ${generateRecursive(obj[key]).renderFlat()}
              </ul>`;
          }
        });
    }

    return `
      <div>
        <h4> ${this.codesArray.find((item) => item.name === this.filesObject.name).title} </h4>
        <ul>
          ${generateRecursive(this.filesObject).renderFlat()}
        </ul>
      </div>
    `;
  }

  private addRemSelectClass(target) {
    let el = target;
    while ((el = el.parentElement) && !el.classList.contains('files-list'));

    const elemWithSelectedClass = el.querySelector('.selected');

    if (!!elemWithSelectedClass) {
      elemWithSelectedClass.classList.remove('selected');
    }
    target.classList.add('selected');
  }

  private findSourceCode(fileName, obj): string {
    return Object.keys(obj)
      .filter((key) => obj.hasOwnProperty(key) && key !== 'name')
      .map((key) => {
        if (key === fileName) {
          return obj[key].content;
        } else {
          if (!!~key.indexOf('.')) {
            return null;
          } else {
            return this.findSourceCode(fileName, obj[key]);
          }
        }
      }).find((item) => !!item);
  }
}

// export const PopUpComponent = new PopUp(Injector.get(CompareService));
