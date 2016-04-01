export class Component {
  constructor(name, template) {
    this.name = name;
    this.templateString = template;

    document.registerElement(name);
  }

  stringToElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.childNodes[0];
  }

  get DOM() {
    return this.stringToElement(this.templateString);
  }
}

export class RegisterComponent {
  constructor() {
    this.components = [];
  }

  addNew(component) {
    this.components.push(component);

    document.addEventListener('DOMContentLoaded', () => {
      const DOMtags = document.querySelectorAll(component.name);

      Array.from(DOMtags).forEach((elem) => {
        elem.appendChild(component.DOM);
      });
    });
  }
}