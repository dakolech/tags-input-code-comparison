import { Component, DOMComponent } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { ShowFile } from '../services/show-file.ts';

require('./files-list.scss');

export class FilesList extends DOMComponent {
  private name: string;

  constructor(
    private filesObject,
    private ShowFile: ShowFile,
    private codesArray
  ) {
    super();
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
                ${generateRecursive(obj[key]).join('')}
              </ul>`;
          }
        });
    }

    return `
      <div>
        <h4> ${this.codesArray.find((item) => item.name === this.filesObject.name).title} </h4>
        <ul>
          ${generateRecursive(this.filesObject).join('')}
        </ul>
      </div>
    `;
  }

  private addRemSelectClass(target) {
    const className = 'selected';
    let el = target;
    while ((el = el.parentElement) && !el.classList.contains('files-list'));

    const elemWithSelectedClass = el.querySelector(`.${className}`);

    if (!!elemWithSelectedClass) {
      elemWithSelectedClass.classList.remove(className);
    }
    target.classList.add(className);
  }

  private findSourceCode(fileName, obj): string {
    return Object.keys(obj)
      .filter((key) => obj.hasOwnProperty(key) && key !== 'name')
      .map((key) => {
        return key === fileName ?
          obj[key].content :
          !!~key.indexOf('.') ?
            null :
            this.findSourceCode(fileName, obj[key]);
      }).find((item) => !!item);
  }
}
