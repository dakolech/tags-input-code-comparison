export class Listeners {
  static add(selector, obj) {
    document.addEventListener('DOMContentLoaded', () => {
      const element = document.querySelector(selector);
      Listeners.addToElement(element, obj);
    });
  }
  
  static addToElement(element, obj) {
    Array.prototype.forEach.call(element.querySelectorAll('[on-click]'), (item) => {
      item.addEventListener('click', (event) => {
        if (typeof obj[event.currentTarget.getAttribute('on-click').slice(0, -2)] === 'function') {
          obj[event.currentTarget.getAttribute('on-click').slice(0, -2)](event);
        }
      });
    });
  }
}