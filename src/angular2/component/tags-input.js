import { Component } from 'angular2/core';

import TagsInputService from './tags-input.service';

import template from './tags-input.jade';

@Component({
  selector: 'tags-input',
  template: template(),
  providers: [TagsInputService]
})

export default class TagsInput {
  constructor(
    tagsInputService: TagsInputService
  ) {
    this.placeholder = 'tags';
    tagsInputService.init();
    this.tagsInputService = tagsInputService;
  }
};
