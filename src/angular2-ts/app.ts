import { Component } from 'angular2/core';
import TagsInput from './component/tags-input.ts';

@Component({
  selector: 'app',
  template: `<tags-input
    [placeholder]="placeholder"
    [selectedTags]="tags"
    [changed]="changedCallback"></tags-input>`,
  directives: [TagsInput]
})

export default class App {
  public placeholder : String;
  public tags : Array<Object>;
  public changedCallback : Function;

  constructor() {
    this.placeholder = 'Tags-input';
    this.tags = [];
  }

  ngOnInit() {
    this.changedCallback = this.changed.bind(this);
  }

  changed(tags) {
    this.tags = tags;
  }
};
