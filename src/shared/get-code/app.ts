import { Files } from './github/files.ts';
import { Listeners } from './lib/listeners.ts';

const codesArray: string[] = [
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

class BetterElement extends Element {
  public name: string;
}

class MainIndex {
  toCompare: string[] = [];

  private switchHidden(elem: Element): void {
    Array.prototype.forEach.call(elem.querySelectorAll('[switch-hide]'), (item) => {
      const className = 'hide';
      item.classList.contains(className) ? item.classList.remove(className) : item.classList.add(className);
    });
  }

  public compareAction(event: Event): void {
    const target = <BetterElement>event.currentTarget;
    const elementName = target.name;

    if (!~this.toCompare.indexOf(elementName)) {
      this.toCompare.push(elementName);
    } else {
      this.toCompare = this.toCompare
        .filter((item: string) => item !== elementName);
    }
    this.switchHidden(target);
  }

  public compare(event: Event): void {
    console.log(this.toCompare);
  }
}

Listeners.add('body', new MainIndex());

Listeners.add('.menu', { asd: () => console.log('asd') });

export class App {
  constructor(element) {
    // ListenersConfig.init();
  }

  static init(element) {
    return new App(element);
  }
}