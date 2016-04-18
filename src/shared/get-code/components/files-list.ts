import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';

require('./files-list.scss');

export class FilesList {
  private codesArray: string[];

  constructor(
    private filesObject
  ) {
    console.log(this.filesObject)
  }

  public render() {
    function generateRecursive(obj: Object): Array<Object> {
      return Object.keys(obj)
        .filter((key) => obj.hasOwnProperty(key) && key !== 'name')
        .map((key) => {
          if (!!~key.indexOf('.')) {
            return `<li class='file'>${key}</li>`;
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
      <div class='files-list'>
        <h4> ${this.filesObject.name} </h4>
        <ul>
          ${generateRecursive(this.filesObject).renderFlat()}
        </ul>
      </div>
    `;
  }
}

// export const PopUpComponent = new PopUp(Injector.get(CompareService));
