import { Component, DOMComponent } from '../lib/components.ts';
import { codesArray } from '../config.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';

class MainIndex extends DOMComponent {
  constructor(
    public config: ConfigListElement[],
    private CompareService: CompareService
  ) {
    super();
  }

  public compareAction(event: Event): void {
    const target = <BetterElement>event.currentTarget;
    const elementName = target.name;

    this.CompareService.push(elementName);
    this.switchHidden(target);
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
            <a name="${item.name}" on-click="compareAction">
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
        ${rows.join('')}
      </div>`;
  }

  private switchHidden(elem: Element): void {
    Array.prototype.forEach.call(elem.querySelectorAll('[switch-hide]'), (item) => {
      const className = 'hide';
      item.classList.contains(className) ? item.classList.remove(className) : item.classList.add(className);
    });
  }
}

Component.create('main-table', new MainIndex(codesArray, Injector.get(CompareService)));
