import { Component } from 'angular2/core';
import TagsInput from './component/tags-input';

/* eslint-disable new-cap */
@Component({
  selector: 'app',
  template: `<tags-input
    [placeholder]="placeholder"
    [selectedTags]="tags"
    (changed)="changed($event)"></tags-input>`,
  directives: [TagsInput]
})
/* eslint-enable new-cap */

export default class App {
  constructor() {
    this.placeholder = 'Tags-input';
    this.tags = [];
  }

  changed(tags) {
    this.tags = tags;
  }
}
