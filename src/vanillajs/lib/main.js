import { RegisteredComponents } from './init';
import { Component } from './component';

export class Main {
  static newComponent(name, options) {
    const newComp = new Component(name, options.template);
    RegisteredComponents.addNew(newComp);
  }
}
