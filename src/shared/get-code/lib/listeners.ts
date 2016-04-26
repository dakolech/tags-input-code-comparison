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
        Observable.fromEvent(elem, 'click').subscribe((event) =>
          Listeners.convertStringToAtrrCall(elem, 'on-click', obj).next(event)
        );
      }

      if (typeof obj[elem.getAttribute('on-click')] === 'function') {
        elem.addEventListener('click', (event) => {
          const fun = Listeners.convertStringToAtrrCall(event.currentTarget, 'on-click', obj).bind(obj);
          fun(event);
        });
      }
    });

    Array.prototype.forEach.call(element.querySelectorAll('[subscribe]'), (elem) => {
      const objectProperty = Listeners.convertStringToAtrrCall(elem, 'subscribe', obj);
      if (objectProperty instanceof Subject) {
        objectProperty.subscribe((item) => elem.innerText = item);
      }
    });

    Array.prototype.forEach.call(element.querySelectorAll('[hide]'), (elem) => {
      const objectProperty = Listeners.convertStringToAtrrCall(elem, 'hide', obj);
      if (objectProperty instanceof Subject) {
        objectProperty.subscribe((item) => !!item ? elem.classList.add('hide') : elem.classList.remove('hide'));
      }
    });

    Array.prototype.forEach.call(element.querySelectorAll('[show]'), (elem) => {
      const objectProperty = Listeners.convertStringToAtrrCall(elem, 'show', obj);
      if (objectProperty instanceof Subject) {
        objectProperty.subscribe((item) => !!item ? elem.classList.remove('hide') : elem.classList.add('hide'));
      }
    });

    Array.prototype.forEach.call(element.querySelectorAll('[subscribe-class]'), (elem) => {
      const objectProperty = Listeners.convertStringToAtrrCall(elem, 'subscribe-class', obj);
      if (objectProperty instanceof Subject) {
        objectProperty.subscribe((item) => elem.className = item);
      }
    });
  }

  static convertStringToAtrrCall(elem, attr, obj) {
    return elem.getAttribute(attr).split('.').reduce((o, i) => o[i], obj);
  }
}
