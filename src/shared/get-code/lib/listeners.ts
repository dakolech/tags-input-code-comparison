import { Observable, Subject } from 'rxjs';

export class Listeners {
  static add(selector, obj) {
    document.addEventListener('DOMContentLoaded', () => {
      const element = document.querySelector(selector);
      Listeners.addToElement(element, obj);
    });
  }
  
  static addToElement(element, obj) {
    Array.prototype.forEach.call(element.querySelectorAll('[on-click]'), (item) => {
      
      if (obj[item.getAttribute('on-click')] instanceof Subject) {
        Observable.fromEvent(item, 'click').subscribe((event) => obj[item.getAttribute('on-click')].next(event));
      }
      
      if (typeof obj[item.getAttribute('on-click').slice(0, -2)] === 'function') {
        item.addEventListener('click', (event) => {
          obj[event.currentTarget.getAttribute('on-click').slice(0, -2)](event);
        });
      }
    });
  }
}