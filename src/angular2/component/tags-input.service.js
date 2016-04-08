import TagsService from '../service/tags.service';
import Rx from 'rxjs/Rx';

const DOWN_KEY = 40;
const UP_KEY = 38;
const ENTER_KEY = 13;

export default class TagsInputService {
  constructor(tagsService: TagsService) {
    this.tagsService = tagsService;
    this.tagsService = tagsService;

    this._suggestions = new Rx.BehaviorSubject();
    this._searchText = new Rx.BehaviorSubject();
    this._selectedIndex = new Rx.BehaviorSubject(-1);
    this._selectedTags = new Rx.BehaviorSubject([]);
    this._eventsStream = new Rx.BehaviorSubject();
    this._removedTagsStream = new Rx.BehaviorSubject();
    this._addedTagsStream = new Rx.BehaviorSubject();

    this._searching();
    this._events();
    this._addRemTags();
  }

  init(inputTags) {
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

  search(searchText) {
    this._searchText.next(searchText);
    this._selectedIndex.next(-1);
  }

  keyDown(event) {
    this._eventsStream.next(event);
  }

  removeTag(tag) {
    this._allTags.push(tag);
    this._removedTagsStream.next(tag);
  }

  addTag(tag) {
    this._allTags = this._allTags.filter((item) => item.id !== tag.id);
    this._addedTagsStream.next(tag);
  }

  _searching() {
    const partitionSearchText = this._searchText
      .partition((searchText) => !!searchText);

    partitionSearchText[0]
      .subscribe((searchText) => this._suggestions.next(
          this._allTags.filter((item) => ~item.name.toLowerCase().indexOf(searchText.toLowerCase()))
        ));

    partitionSearchText[1]
      .subscribe(() => {
        this._suggestions.next([]);
      });
  }

  _events() {
    const eventsWithSearchText = this._searchText
      .map((searchText) => {
        return !!searchText ? this._eventsStream : Rx.Observable.empty();
      })
      .switch()
      .filter((event) => !!event && !!event.keyCode);

    const keyDownEvents = eventsWithSearchText
      .filter((event) => event.keyCode === DOWN_KEY);
    const keyUpEvents = eventsWithSearchText
      .filter((event) => event.keyCode === UP_KEY);
    const enterEvents = eventsWithSearchText
      .filter((event) => event.keyCode === ENTER_KEY);

    Rx.Observable
      .merge(
        keyDownEvents,
        keyUpEvents,
        enterEvents
      )
      .subscribe((event) => event.preventDefault());

    const selectedTag = this._selectedIndex
      .combineLatest(this._suggestions, (index, sugg) => sugg[index]);

    const enterEventsWithTag = enterEvents
      .withLatestFrom(selectedTag, (event, tag) => tag)
      .partition((tag) => !!tag);

    enterEventsWithTag[1]
      .withLatestFrom(this._searchText, (event, text) => text)
      .switchMap(this.tagsService.createOne.bind(this.tagsService))
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.next(tags);
      });

    enterEventsWithTag[0]
      .filter((tag) => !!tag)
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        this._allTags = this._allTags.filter((item) => item.id !== tag.id);
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.next(tags);
        this._suggestions.next([]);
        this._selectedIndex.next(-1);
      });

    const isNotLast = this._selectedIndex
      .combineLatest(this._suggestions, (index, sugg) => index !== sugg.length - 1);

    const keyDownAndNotLast = keyDownEvents
      .map(() => +1)
      .withLatestFrom(isNotLast, (value, notLast) => {
        return notLast ? value : false;
      })
      .filter((item) => item);

    const keyUpEventsAndNotFirst = keyUpEvents
      .map(() => -1)
      .withLatestFrom(this._selectedIndex, (value, index) => {
        return index > 0 ? value : false;
      })
      .filter((item) => item);

    Rx.Observable
      .merge(
        keyDownAndNotLast,
        keyUpEventsAndNotFirst
      )
      .withLatestFrom(this._selectedIndex, (value, index) => ({ value: value, index: index }))
      .scan((acc, val) => {
        const newAcc = val.index === -1 ? -1 : acc;
        return newAcc + val.value;
      }, -1)
      .subscribe((item) => {
        this._selectedIndex.next(item);
      });
  }

  _addRemTags() {
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
        this._suggestions.next([]);
        this._selectedIndex.next(-1);
      });
  }
}
