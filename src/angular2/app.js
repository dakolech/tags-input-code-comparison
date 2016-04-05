import { Component } from 'angular2/core';
import TagsInput from './component/tags-input';

@Component({
  selector: 'app',
  template: `<tags-input
    [placeholder]="placeholder"
    [selectedTags]="tags"
    [changed]="changedCallback"></tags-input>`,
  directives: [TagsInput]
})

export default class App {
  constructor() {
    this.placeholder = 'Tags-input';
    this.tags = [];
  }

  ngOnInit() {
    this.changedCallback = this.changed.bind(this);
  }

  changed(tags) {
    this.tags = tags;
    console.log(this.tags);
  }
};
