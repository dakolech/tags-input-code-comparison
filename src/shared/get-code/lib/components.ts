import { Listeners } from './listeners.ts';

export class Component {
  static stringToElement(html) {
    const template: any = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
  }

  static create(selector, obj, htmlString?) {
    const rendered = typeof obj.render === 'function' ? obj.render() : null;
    const component = Component.stringToElement(rendered || htmlString);
    document.addEventListener('DOMContentLoaded', () => {
      const DOMtags = document.querySelectorAll(selector);

      Array.from(DOMtags).forEach((elem) => {
        if (!!component) {
          elem.appendChild(component);
        }
        if (!!obj) {
          Listeners.addToElement(elem, obj);
        }
      });
    });
  }
}
