import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';

import TagsInputService from './tags-input.service.ts';

import Tag from '../models/tag.ts';

declare function require (id: string): any;

const template = require('./tags-input.jade');

@Component({
  selector: 'tags-input',
  template: template(),
  providers: [TagsInputService],
  directives: [CORE_DIRECTIVES],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export default class TagsInput {
  public searchText: String;
  public suggestions;
  public selectedIndex: number;
  @Input() placeholder: string;
  @Input() selectedTags: Array<Tag>;
  @Output() changed = new EventEmitter<Array<Tag>>();

  constructor(
    private tagsInputService: TagsInputService
  ) {
    this.searchText = '';
  }

  ngOnInit(): void {
    this.tagsInputService.init(this.selectedTags);

    this.suggestions = this.tagsInputService.suggestions;

    this.tagsInputService.selectedIndex.subscribe((index) => this.selectedIndex = index);

    this.tagsInputService.selectedIndex
      .filter((index) => !!this.suggestions[index])
      .subscribe((index) => this.searchText = this.suggestions[index].name);

    this.tagsInputService.selectedTags.subscribe((tags) => {
      this.searchText = '';
      this.selectedTags = tags;
      this.changed.emit(this.selectedTags);
    });
  }

  search(searchText) {
    this.tagsInputService.search(searchText);
  }

  checkKeyDown(event) {
    this.tagsInputService.keyDown(event);
  }

  removeTag(tag) {
    this.tagsInputService.removeTag(tag);
  }

  addSelectedTag(tag) {
    this.tagsInputService.addTag(tag);
  }
};
