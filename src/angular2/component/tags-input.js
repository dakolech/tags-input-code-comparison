import { Component, ChangeDetectionStrategy, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import TagsInputService from './tags-input.service';

import template from './tags-input.jade';

@Component({
  selector: 'tags-input',
  template: template(),
  providers: [TagsInputService],
  directives: [CORE_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['selectedTags', 'placeholder'],
  outputs: ['changed']
})

export default class TagsInput {
  constructor(
    tagsInputService: TagsInputService
  ) {
    this.changed = new EventEmitter();
    this.searchText = '';
    this.tagsInputService = tagsInputService;
  }

  ngOnInit() {
    this.tagsInputService.init(this.selectedTags);

    this.suggestions = this.tagsInputService.suggestions;

    this.tagsInputService.selectedIndex.subscribe((index) => this.selectedIndex = index);

    this.tagsInputService.selectedIndex
      .filter((index) => !!this.suggestions[index])
      .subscribe((index) => this.searchText = this.suggestions[index].name)

    this.tagsInputService.selectedTags.subscribe((tags) => {
      this.searchText = '';
      this.selectedTags = tags;
      this.changed.emit(this.selectedTags);
    });
  }

  search(searchText) {
    this.tagsInputService.search(searchText)
  }

  checkKeyDown(event) {
    this.tagsInputService.keyDown(event)
  }

  removeTag(tag) {
    this.tagsInputService.removeTag(tag)
  }

  addSelectedTag(tag) {
    this.tagsInputService.addTag(tag)
  }
};
