import { Component } from 'angular2/core';

import TagsService from '../service/tags.service';

import template from './tags-input.jade';

@Component({
  selector: 'tags-input',
  template: template(),
  providers: [TagsService]
})

export default class TagsInput {
  constructor(
    tagsService: TagsService
  ) {
    this.placeholder = 'tags';
    tagsService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }
};
