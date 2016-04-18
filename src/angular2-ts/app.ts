import { Component } from 'angular2/core';
import TagsInput from './component/tags-input.ts';
import TagsService from './service/tags.service.ts';

@Component({
  selector: 'app',
  template: `<tags-input
    [placeholder]="placeholder"
    [selectedTags]="tags"
    (changed)="changed($event)"></tags-input>`,
  directives: [TagsInput],
  providers: [TagsService]
})

export default class App {
  public placeholder : String;
  public tags : Array<Object>;

  constructor() {
    this.placeholder = 'Tags-input';
    this.tags = [];
  }

  changed(tags) {
    this.tags = tags;
  }
};
