import { Component, DOMComponent } from '../lib/components.ts';
import { codesArray } from '../config.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { BehaviorSubject } from 'rxjs';

class MainIndex extends DOMComponent {
  public hideObs: Object = {};

  constructor(
    public config: ConfigListElement[],
    private CompareService: CompareService
  ) {
    super();
    this.config.forEach((item) => {
      this.hideObs[item.name] = new BehaviorSubject<boolean>(true);
    });

    this.CompareService.toCompare.subscribe((toCompare) => {
      this.config.forEach((configItem) => {
        this.hideObs[configItem.name].next(!!~toCompare.indexOf(configItem.name) ? false : true);
      });
    });
  }

  public compareAction(event: Event): void {
    const currentTarget = <BetterElement>event.currentTarget;
    const elementName = currentTarget.name;

    this.CompareService.push(elementName);
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
              <h6 show="hideObs.${item.name}"> Add to compare </h6>
              <h6 hide="hideObs.${item.name}"> Remove from compare </h6>
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
}

Component.create('main-table', new MainIndex(codesArray, Injector.get(CompareService)));
