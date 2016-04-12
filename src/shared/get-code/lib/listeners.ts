export class Listeners {
  static add(element, obj) {
    Array.prototype.forEach.call(document.querySelectorAll('[on-click]'), (item) => {
      item.addEventListener('click', (event) => {
        obj[event.currentTarget.getAttribute('on-click').slice(0, -2)](event);
      });
    });
  }
}