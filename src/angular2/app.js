import { Component } from 'angular2/core';
import TagsInput from './component/tags-input';

@Component({
  selector: 'app',
  template: '<tags-input></tags-input>',
  directives: [TagsInput]
})

export default class App {
  constructor() {
  }
};
