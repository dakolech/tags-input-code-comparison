import { Listeners } from './listeners.ts';
import { BehaviorSubject } from 'rxjs';

export class Component {
  static stringToElement(html: string) {
    const template: any = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  static create(selector: string, obj: DOMComponent, htmlString?: string) {
    const rendered = typeof obj.render === 'function' ? obj.render() : null;
    const component = Component.stringToElement(rendered || htmlString);

    if (document.readyState === 'complete' || document.readyState === 'loaded') {
      Component.compile(selector, component, obj);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        Component.compile(selector, component, obj);
      });
    }
  }

  static compile(selector, component, obj: DOMComponent) {
    const DOMtags = document.querySelectorAll(selector);

    Array.from(DOMtags).forEach((elem) => {
      obj.parent.next(elem);
      obj.DOM.next(component);
    });
  }
}

export class DOMComponent implements IDOMComponent {
  public DOM: BehaviorSubject<Node> = new BehaviorSubject(null);
  public DOMstring: BehaviorSubject<string> = new BehaviorSubject(null);
  public parent: BehaviorSubject<Node> = new BehaviorSubject(null);

  constructor() {
    const parentSubject = this.parent.filter((dom: Node) => !!dom);

    this.DOMstring.filter((dom: string) => !!dom)
      .subscribe((dom) => {
        this.DOM.next(Component.stringToElement(dom))
      });

    this.DOM
      .withLatestFrom(parentSubject, (dom, parent) => {
        return { dom: dom, parent: parent};
      })
      .subscribe((item) => {
        if (!!item.parent.childNodes[0] && !!item.dom) {
          item.parent.removeChild(item.parent.childNodes[0]);
        }

        if (!!item.dom) {
          item.parent.appendChild(item.dom);
        }

        Listeners.addToElement(item.parent, this);

        this.afterRender();
      });
  }

  public render() {
    return '';
  }

  public afterRender() {}

  public reRender() {
    this.DOMstring.next(this.render());
  }
}
