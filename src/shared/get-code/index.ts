import { Files } from './github/files.ts';
import { Listeners } from './lib/listeners.ts';

const codesArray: Array<string> = [
  'angular',
  'angular-rx',
  'angular2',
  'angular2-ts'
];

const object = new Files(codesArray);
let allFiles = {};

object.files.subscribe((item) => {
  allFiles = item;
});

const toCompare = [];

class MainIndex {
  toCompare: Array<string> = [];

  addToCompare(event) {
    const elementName = event.currentTarget.name;
    if (!this.toCompare.includes(elementName)) {
      this.toCompare.push(elementName);
    }
  }
  
  compare(event) {
    console.log(this.toCompare);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  Listeners.add(document, new MainIndex());
});
