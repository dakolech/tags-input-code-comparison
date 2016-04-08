const DOWN_KEY = 40;
const UP_KEY = 38;
const ENTER_KEY = 13;

function tagsInputController($scope, tagsService) {
  const formName = this.name ? this.name : 'form';

  const waitForForm = $scope.$watch(formName, (newVal) => {
    /* istanbul ignore else  */
    if (newVal) {
      this.form = $scope[formName];
      waitForForm();
    }
  });

  this.allTags = [];

  if (!this.ngModel) this.ngModel = [];

  tagsService.getAllTags().then((resp) => {
    this.allTags = resp.data;
    if (this.ngModel.length > 0) {
      this.allTags = this.allTags.filter((item) => {
        const foundItem = this.ngModel.find((innerItem) => innerItem.id === item.id);
        return !foundItem;
      });
    }
  });

  this.selectedIndex = -1;

  if (!!this.ngChange) {
    $scope.$watch(() => this.ngModel, () => {
      /* istanbul ignore else  */
      if (typeof this.ngChange === 'function') {
        this.ngChange();
      }
    }, true);
  }

  this.search = () => {
    if (!!this.searchText) {
      this.suggestions = this.allTags.filter((item) => ~item.name.toLowerCase().indexOf(this.searchText.toLowerCase()));
    } else {
      this.suggestions = [];
    }
    this.selectedIndex = -1;
  };

  this.checkKeyDown = (event) => {
    if (!!this.searchText) {
      if (event.keyCode === DOWN_KEY) {
        event.preventDefault();
        if (this.selectedIndex !== this.suggestions.length - 1) {
          this.selectedIndex++;
        }
      } else if (event.keyCode === UP_KEY) {
        event.preventDefault();
        if (~(this.selectedIndex - 1)) {
          this.selectedIndex--;
        }
      } else if (event.keyCode === ENTER_KEY) {
        event.preventDefault();
        if (this.form.$valid) {
          if (~this.selectedIndex) {
            this.addToSelectedTags(this.suggestions[this.selectedIndex].id);
          } else {
            this.addNewTag();
          }
        }
      }
    }
  };

  $scope.$watch('tagsInputVM.selectedIndex', (val) => {
    if (val !== -1) {
      this.searchText = this.suggestions[this.selectedIndex].name;
    }
  });

  function moveFromOneArrayToAnother(fromArray, toArray, id) {
    let foundIndex;
    const foundItem = fromArray.find((item, index) => {
      foundIndex = index;
      return item.id === id;
    });
    toArray.push(foundItem);
    fromArray.splice(foundIndex, 1);
  }

  this.addToSelectedTags = (id) => {
    moveFromOneArrayToAnother(this.allTags, this.ngModel, id);
    this.searchText = '';
    this.suggestions = [];
  };

  this.removeTag = (id) => {
    moveFromOneArrayToAnother(this.ngModel, this.allTags, id);
  };

  this.addNewTag = () => {
    const isTag = this.allTags.find((item) => item.name.toLowerCase() === this.searchText.toLowerCase());
    if (!!isTag) {
      this.addToSelectedTags(isTag.id);
    } else {
      tagsService.createOne(this.searchText).then((resp) => {
        this.ngModel.push(resp.data);
        this.searchText = '';
      });
    }
  };
}

tagsInputController.$inject = ['$scope', 'tagsService'];

export default tagsInputController;
