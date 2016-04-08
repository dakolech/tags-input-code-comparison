import { Component } from 'angular2/core';
import TagsInput from './component/tags-input';

@Component({
  selector: 'app',
  template: `<tags-input
    [placeholder]="placeholder"
    [selectedTags]="tags"
    (changed)="changed($event)"></tags-input>`,
  directives: [TagsInput]
})

export default class App {
  constructor() {
    this.placeholder = 'Tags-input';
    this.tags = [];
  }

  changed(tags) {
    this.tags = tags;
  }
};
