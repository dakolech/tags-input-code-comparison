import { Observable, Subject } from 'rxjs';

export class Listeners {
  static add(selector, obj) {
    document.addEventListener('DOMContentLoaded', () => {
      const element = document.querySelector(selector);
      Listeners.addToElement(element, obj);
    });
  }

  static addToElement(element, obj) {
    Array.prototype.forEach.call(element.querySelectorAll('[on-click]'), (elem) => {

      if (obj[elem.getAttribute('on-click')] instanceof Subject) {
        Observable.fromEvent(elem, 'click').subscribe((event) => obj[elem.getAttribute('on-click')].next(event));
      }

      if (typeof obj[elem.getAttribute('on-click')] === 'function') {
        elem.addEventListener('click', (event) => {
          obj[event.currentTarget.getAttribute('on-click')](event);
        });
      }
    });

    Array.prototype.forEach.call(element.querySelectorAll('[subscribe]'), (elem) => {
      if (obj[elem.getAttribute('subscribe')] instanceof Subject) {
        obj[elem.getAttribute('subscribe')].subscribe((item) => elem.innerText = item);
      }
    });
  }
}
