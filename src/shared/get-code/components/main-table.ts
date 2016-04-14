import { Component } from '../lib/components.ts';
import { codesArray } from '../config.ts';

class MainIndex {
  toCompare: string[] = [];
  
  constructor(public config: ConfigListElement[]) {}

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
  
  public render() {
    const elements = this.config.map((item: ConfigListElement) =>
      `<div class="col-lg-${item.colWidth} ${item.name}">
          <div class="row image">
            <div class="image-container">
              ${item.imageHMTL}
            </div>
          </div>
          <div class="row text">
            <h4> ${item.title} </h4>
          </div>
          <div class="row text">
            <a name="${item.name}" on-click="compareAction()">
              <h6 switch-hide> Add to compare </h6>
              <h6 switch-hide class="hide"> Remove from compare </h6>
            </a>
            <a href="${item.name}/">
              <h6> Live demo </h6>
            </a>
          </div>
        </div>`);
        
    const rows = this.config.reduce((prev: string[], curr: ConfigListElement, index) => {
      prev[curr.row - 1] = (prev[curr.row - 1] || '') + elements[index];
      return prev;
    }, []);

    return `
      <div class="main-table">
        ${rows.reduce((prev, curr) => prev + curr, '')}
      </div>
    `
  }
}

Component.create('main-table', new MainIndex(codesArray));
