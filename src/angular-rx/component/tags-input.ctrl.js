function tagsInputController($scope, $timeout, rx, observeOnScope, tagsInputService) {
  const formName = this.name ? this.name : 'form';

  const formObserver = observeOnScope($scope, formName)
    .filter((item) => !!item.newValue)
    .first();

  formObserver.subscribe(() => {
    this.form = $scope[formName];
  });

  observeOnScope($scope, () => this.ngModel)
    .filter((item) => !!item)
    .first()
    .subscribe((ngModel) => tagsInputService.init(ngModel.newValue));

  const ngChangeObserver = observeOnScope($scope, () => this.ngChange)
    .filter((item) => !!item.newValue && typeof item.newValue === 'function');

  ngChangeObserver.first().subscribe(() => {
    observeOnScope($scope, formName, true)
      .subscribe(() => {
        this.ngChange();
      });
  });

  tagsInputService.suggestions.subscribe((sugg) => {
    this.suggestions = sugg;
  });
  tagsInputService.selectedIndex.subscribe((index) => {
    this.selectedIndex = index;
  });

  tagsInputService.selectedIndex
    .filter((index) => !!this.suggestions[index])
    .subscribe((index) => {
      this.searchText = this.suggestions[index].name;
    });

  tagsInputService.selectedTags.subscribe((tags) => {
    $timeout(() => {
      this.searchText = '';
      this.ngModel = tags;
    });
  });

  this.search = () => tagsInputService.search(this.searchText);
  this.checkKeyDown = (event) => tagsInputService.keyDown(event);

  this.removeTag = (tag) => tagsInputService.removeTag(tag);
  this.addSelectedTag = (tag) => tagsInputService.addTag(tag);
}

tagsInputController.$inject = ['$scope', '$timeout', 'rx', 'observeOnScope', 'tagsInputService'];

export default tagsInputController;
