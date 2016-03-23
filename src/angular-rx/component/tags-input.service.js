const DOWN_KEY = 40;
const UP_KEY = 38;
const ENTER_KEY = 13;

class tagsInputService {
  constructor(rx, tagsService) {
    this.rx = rx;
    this.tagsService = tagsService;

    this._suggestions = new this.rx.BehaviorSubject();
    this._searchText = new this.rx.BehaviorSubject();
    this._selectedIndex = new this.rx.BehaviorSubject(-1);
    this._selectedTags = new this.rx.BehaviorSubject([]);
    this._eventsStream = new this.rx.BehaviorSubject();
    this._removedTagsStream = new this.rx.BehaviorSubject();
    this._addedTagsStream = new this.rx.BehaviorSubject();

    this._searching();
    this._events();
    this._addRemTags();
  }

  init(ngModel) {
    this.tagsService.getAllTags()
      .subscribe((resp) => {
        this._allTags = resp.data.filter((item) => {
          return !(ngModel || []).find((ngModelItem) => ngModelItem.id === item.id);
        });
      });
    this._selectedTags.onNext(ngModel || []);
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
    this._searchText.onNext(searchText);
    this._selectedIndex.onNext(-1);
  }

  keyDown(event) {
    this._eventsStream.onNext(event);
  }

  removeTag(tag) {
    this._allTags.push(tag);
    this._removedTagsStream.onNext(tag);
  }

  addTag(tag) {
    this._allTags = this._allTags.filter((item) => item.id !== tag.id);
    this._addedTagsStream.onNext(tag);
  }

  _searching() {
    const partitionSearchText = this._searchText
      .partition((searchText) => !!searchText);

    partitionSearchText[0]
      .subscribe((searchText) => this._suggestions.onNext(
          this._allTags.filter((item) => ~item.name.toLowerCase().indexOf(searchText.toLowerCase()))
        ));

    partitionSearchText[1]
      .subscribe((searchText) => this._suggestions.onNext([]));
  }

  _events() {
    const eventsWithSearchText = this._searchText
      .map((searchText) => !!searchText ? this._eventsStream : this.rx.Observable.empty())
      .switch()
      .filter((event) => !!event && !!event.keyCode)

    const keyDownEvents = eventsWithSearchText
      .filter((event) => event.keyCode === DOWN_KEY)
    const keyUpEvents = eventsWithSearchText
      .filter((event) => event.keyCode === UP_KEY)
    const enterEvents = eventsWithSearchText
      .filter((event) => event.keyCode === ENTER_KEY)

    this.rx.Observable
      .merge(
        keyDownEvents,
        keyUpEvents,
        enterEvents
      )
      .subscribe((event) => event.preventDefault())

    const selectedTag = this._selectedIndex
      .combineLatest(this._suggestions, (index, sugg) => sugg[index])

    const enterEventsWithTag = enterEvents
      .withLatestFrom(selectedTag, (event, tag) => tag)
      .partition((tag) => !!tag)

    enterEventsWithTag[1]
      .withLatestFrom(this._searchText, (event, text) => text)
      .flatMapLatest(this.tagsService.createOne.bind(this.tagsService))
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.onNext(tags);
      })

    enterEventsWithTag[0]
      .filter((tag) => !!tag)
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        this._allTags = this._allTags.filter((item) => item.id !== tag.id);
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.onNext(tags);
        this._suggestions.onNext([]);
        this._selectedIndex.onNext(-1);
      })

    const isNotLast = this._selectedIndex
      .combineLatest(this._suggestions, (index, sugg) => index !== sugg.length - 1);

    const keyDownAndNotLast = keyDownEvents
      .map(() => +1)
      .withLatestFrom(isNotLast, (value, notLast) => notLast ? value : false)
      .filter((item) => item)

    const keyUpEventsAndNotFirst = keyUpEvents
      .map(() => -1)
      .withLatestFrom(this._selectedIndex, (value, index) => index > 0 ? value : false)
      .filter((item) => item)

    this.rx.Observable
      .merge(
        keyDownAndNotLast,
        keyUpEventsAndNotFirst
      )
      .withLatestFrom(this._selectedIndex, (value, index) => ({value: value, index: index}))
      .scan((acc, val) => {
        acc = val.index === -1 ? -1 : acc;
        return acc + val.value;
      }, -1)
      .subscribe((item) => {
        this._selectedIndex.onNext(item);
      });
  }

  _addRemTags() {
    this._removedTagsStream
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        return tags.filter((item) => item.id !== tag.id);
      })
      .subscribe((tags) => this._selectedTags.onNext(tags));

    this._addedTagsStream
      .withLatestFrom(this._selectedTags, (tag, tags) => {
        tags.push(tag);
        return tags;
      })
      .subscribe((tags) => {
        this._selectedTags.onNext(tags);
        this._suggestions.onNext([]);
        this._selectedIndex.onNext(-1);
      });
  }

}

tagsInputService.$inject = ['rx', 'tagsService'];

export default tagsInputService;
