export class Listeners {
  static add(element, obj) {
    console.log(obj)
    Array.prototype.forEach.call(document.querySelectorAll('[on-click]'), (item) => {
      console.log(obj)
      item.addEventListener('click', (event) => {
        obj[event.currentTarget.getAttribute('on-click').slice(0, -2)](event);
      });
    });
  }
}