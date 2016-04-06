import TagsService from '../service/tags.service.ts';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Injectable } from 'angular2/core';
import Tag from '../models/tag.ts';

const DOWN_KEY = 40;
const UP_KEY = 38;
const ENTER_KEY = 13;

@Injectable()
export default class TagsInputService {
  private _suggestions: Subject<Array<Tag>> = new Subject<Array<Tag>>();
  private _allTags: Array<Tag>;
  private _searchText: Subject<string> = new Subject<string>();
  private _selectedIndex: BehaviorSubject<number> = new BehaviorSubject<number>(-1);
  private _selectedTags: BehaviorSubject<Array<Tag>> = new BehaviorSubject<Array<Tag>>([]);
  private _eventsStream: Subject<Event> = new Subject<Event>();
  private _removedTagsStream: Subject<Tag> = new Subject<Tag>();
  private _addedTagsStream: Subject<Tag> = new Subject<Tag>();

  constructor(private tagsService: TagsService) {
    this.searching();
    this.events();
    this.addRemTags();
  }

  public init(inputTags: Array<Tag>) {
    this.tagsService.getTags()
      .subscribe((tags) => {
        this._allTags = tags.filter((item) => {
          return !(inputTags || []).find((inputTagsItem) => inputTagsItem.id === item.id);
        });
      });
    this._selectedTags.next(inputTags || []);
  }

  get suggestions() {
    return this._suggestions;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  get selectedTags() {
    return this._selectedTags;
  }

  public search(searchText: string) {
    this._searchText.next(searchText);
    this._selectedIndex.next(-1);
  }

  public keyDown(event: Event) {
    this._eventsStream.next(event);
  }

  public removeTag(tag: Tag) {
    this._allTags.push(tag);
    this._removedTagsStream.next(tag);
  }

  public addTag(tag: Tag) {
    this._allTags = this._allTags.filter((item) => item.id !== tag.id);
    this._addedTagsStream.next(tag);
  }

  private searching() {
    const partitionSearchText = this._searchText
      .partition((searchText) => !!searchText);

    partitionSearchText[0]
      .subscribe((searchText) => this.suggestions.next(
          this._allTags.filter((item: Tag) => !!~item.name.toLowerCase().indexOf(searchText.toLowerCase()))
        ));

    partitionSearchText[1]
      .subscribe((searchText) => this.suggestions.next([]));
  }

  private events() {
    const eventsWithSearchText = this._searchText
      .map((searchText) => !!searchText ? this._eventsStream : Observable.empty())
      .switch()
      .filter((event: any) => !!event && !!event.keyCode)

    const keyDownEvents = eventsWithSearchText
      .filter((event: any) => event.keyCode === DOWN_KEY)
    const keyUpEvents = eventsWithSearchText
      .filter((event: any) => event.keyCode === UP_KEY)
    const enterEvents = eventsWithSearchText
      .filter((event: any) => event.keyCode === ENTER_KEY)

    Observable
      .merge(
        keyDownEvents,
        keyUpEvents,
        enterEvents
      )
      .subscribe((event: Event) => event.preventDefault())

    const selectedTag = this._selectedIndex
      .combineLatest(this.suggestions, (index, sugg) => sugg[index])

    const enterEventsWithTag = enterEvents
      .withLatestFrom(selectedTag, (event, tag) => tag)
      .partition((tag) => !!tag)

    enterEventsWithTag[1]
      .withLatestFrom(this._searchText, (event, text) => text)
      .switchMap(this.tagsService.createOne.bind(this.tagsService))
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.next(tags);
      })

    enterEventsWithTag[0]
      .filter((tag) => !!tag)
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        this._allTags = this._allTags.filter((item) => item.id !== tag.id);
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.next(tags);
        this.suggestions.next([]);
        this._selectedIndex.next(-1);
      })

    const isNotLast = this._selectedIndex
      .combineLatest(this.suggestions, (index, sugg) => index !== sugg.length - 1);

    const keyDownAndNotLast = keyDownEvents
      .map(() => +1)
      .withLatestFrom(isNotLast, (value, notLast) => notLast ? value : false)
      .filter((item) => !!item)

    const keyUpEventsAndNotFirst = keyUpEvents
      .map(() => -1)
      .withLatestFrom(this._selectedIndex, (value, index) => index > 0 ? value : false)
      .filter((item) => !!item)

    Observable
      .merge(
        keyDownAndNotLast,
        keyUpEventsAndNotFirst
      )
      .withLatestFrom(this._selectedIndex, (value, index) => ({value: value, index: index}))
      .scan((acc, val: any) => {
        acc = val.index === -1 ? -1 : acc;
        return acc + val.value;
      }, -1)
      .subscribe((item) => {
        this._selectedIndex.next(item);
      });
  }

  private addRemTags() {
    this._removedTagsStream
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        return tags.filter((item) => item.id !== tag.id);
      })
      .subscribe((tags) => this._selectedTags.next(tags));

    this._addedTagsStream
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.next(tags);
        this.suggestions.next([]);
        this._selectedIndex.next(-1);
      });
  }

}