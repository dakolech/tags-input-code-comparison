import { Component } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import TagsInputService from './tags-input.service';

import template from './tags-input.jade';

@Component({
  selector: 'tags-input',
  template: template(),
  providers: [TagsInputService],
  directives: [CORE_DIRECTIVES]
})

export default class TagsInput {
  constructor(
    tagsInputService: TagsInputService
  ) {
    this.placeholder = 'tags';
    this.searchText = '';
    tagsInputService.init();

    tagsInputService.suggestions.subscribe((sugg) => this.suggestions = sugg);
    tagsInputService.selectedIndex.subscribe((index) => this.selectedIndex = index);

    tagsInputService.selectedIndex
      .filter((index) => !!this.suggestions[index])
      .subscribe((index) => this.searchText = this.suggestions[index].name)

    tagsInputService.selectedTags.subscribe((tags) => {
      this.searchText = '';
      this.selectedTags = tags;
    });

    this.tagsInputService = tagsInputService;
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
