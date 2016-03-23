import componentModule from './tags-input.component';

const DOWN_KEY = 40;
const UP_KEY = 38;
const ENTER_KEY = 13;
const CTRL_KEY = 17;
const BACKSPACE_KEY = 8;

describe('Directive: tagsInput', () => {
  let $compile, element, $rootScope, $scope, tagsInputController;
  const tagsArray = [{
    id: 1,
    name: 'shopping'
  }, {
    id: 2,
    name: 'holidays'
  }, {
    id: 3,
    name: 'far future'
  }, {
    id: 4,
    name: 'character'
  }];
  const mockedTagsService = {
    getAllTags: angular.noop,
    createOne: angular.noop
  };
  let successCallback;
  let successCallbackCreate;

  beforeEach(window.module(componentModule.name, {
    tagsService: mockedTagsService
  }));

  $compile = {};
  $rootScope = {};
  element = {};
  $scope = {};

  beforeEach(() => {
    spyOn(mockedTagsService, 'getAllTags').and.returnValue({
      then: function(success) {
        successCallback = success;
      }
    });
    spyOn(mockedTagsService, 'createOne').and.returnValue({
      then: function(success) {
        successCallbackCreate = success;
      }
    });
  });


  describe('Without tags at the begining', () => {
    beforeEach(() => {
      compileElement([]);
      successCallback({ data: angular.copy(tagsArray) });
    });

    it('should compile', () => {
      expect(element).toBeTruthy();
    });

    it('should get all tags from service and set it to this.allTags', () => {
      expect(tagsInputController.allTags).toEqual(tagsArray);
    });

    it('should set ngModel to an empty array', () => {
      expect(tagsInputController.ngModel).toEqual([]);
    });

    it('should set selectedIndex to -1', () => {
      expect(tagsInputController.selectedIndex).toBe(-1);
    });

    describe('click enter with empty input', () => {
      beforeEach(() => {
        triggerKeyDown(ENTER_KEY);
        spyOn(tagsInputController, 'addToSelectedTags');
        spyOn(tagsInputController, 'addNewTag');
      });

      it('should not change selectedIndex', () => {
        expect(tagsInputController.selectedIndex).toBe(-1);
      });

      it('should not add tag', () => {
        expect(tagsInputController.addToSelectedTags).not.toHaveBeenCalled();
        expect(tagsInputController.addNewTag).not.toHaveBeenCalled();
      });
    });

    describe('click enter with invalid input', () => {
      beforeEach(() => {
        element.find('[ng-model="tagsInputVM.searchText"]').val('ho').trigger('input');
        tagsInputController.form.tag.$setValidity('specialChars', false);
        triggerKeyDown(ENTER_KEY);
        spyOn(tagsInputController, 'addToSelectedTags');
        spyOn(tagsInputController, 'addNewTag');
      });

      it('should not change selectedIndex', () => {
        expect(tagsInputController.selectedIndex).toBe(-1);
      });

      it('should not add tag', () => {
        expect(tagsInputController.addToSelectedTags).not.toHaveBeenCalled();
        expect(tagsInputController.addNewTag).not.toHaveBeenCalled();
      });
    });

    describe('call search method with empty searchText', () => {
      beforeEach(() => {
        tagsInputController.search();
      });

      it('should clean suggestions', () => {
        expect(tagsInputController.suggestions).toEqual([]);
      });
    });

    describe('Type "ho" in input', () => {
      beforeEach(() => {
        element.find('[ng-model="tagsInputVM.searchText"]').val('ho').trigger('input');
      });

      it('should be two tags in suggestions', () => {
        expect(tagsInputController.suggestions).toEqual(tagsArray.slice(0, 2));
      });

      describe('click keydown two times', () => {
        beforeEach(() => {
          triggerKeyDown(DOWN_KEY);
          triggerKeyDown(DOWN_KEY);
        });

        it('should set selectedIndex to 1', () => {
          expect(tagsInputController.selectedIndex).toBe(1);
        });

        it('should add active class to second suggested tag', () => {
          expect(element.find('.list-group-item.suggested-tag:eq(1)').hasClass('active')).toBeTruthy();
        });

        describe('click keyup two times', () => {
          beforeEach(() => {
            triggerKeyDown(UP_KEY);
            triggerKeyDown(UP_KEY);
          });

          it('should set selectedIndex to 0', () => {
            expect(tagsInputController.selectedIndex).toBe(0);
          });

          it('should add active class to first suggested tag', () => {
            expect(element.find('.list-group-item.suggested-tag:eq(0)').hasClass('active')).toBeTruthy();
          });
        });

        describe('click keydown one more time', () => {
          beforeEach(() => {
            triggerKeyDown(DOWN_KEY);
          });

          it('should not change selectedIndex', () => {
            expect(tagsInputController.selectedIndex).toBe(1);
          });

          it('should not remove active class from second suggested tag', () => {
            expect(element.find('.list-group-item.suggested-tag:eq(1)').hasClass('active')).toBeTruthy();
          });
        });

        describe('click ctrl key', () => {
          beforeEach(() => {
            triggerKeyDown(CTRL_KEY);
            spyOn(tagsInputController, 'addToSelectedTags');
            spyOn(tagsInputController, 'addNewTag');
          });

          it('should not change selectedIndex', () => {
            expect(tagsInputController.selectedIndex).toBe(1);
          });

          it('should not add tag', () => {
            expect(tagsInputController.addToSelectedTags).not.toHaveBeenCalled();
            expect(tagsInputController.addNewTag).not.toHaveBeenCalled();
          });
        });

        describe('click enter', () => {
          beforeEach(() => {
            triggerKeyDown(ENTER_KEY);
          });

          it('should clean input', () => {
            expect(element.find('[ng-model="tagsInputVM.searchText"]').val()).toBe('');
          });

          it('should clean suggestions', () => {
            expect(tagsInputController.suggestions).toEqual([]);
          });

          it('should add selected tag', () => {
            expect(element.find('.tag.label.label-primary').text()).toContain(tagsArray[1].name);
          });

          it('should remove selected tag from allTags', () => {
            expect(tagsInputController.allTags).not.toContain(tagsArray[1]);
          });

          describe('remove tag', () => {
            beforeEach(() => {
              element.find('.tag.label.label-primary b.remove').click();
            });

            it('should remove tag from ngModel', () => {
              expect(tagsInputController.ngModel).toEqual([]);
            });

            it('should add removed tag to allTags', () => {
              expect(tagsInputController.allTags).toContain(tagsArray[1]);
            });
          });
        });
      });
    });

    describe('Type "shopping" in input', () => {
      beforeEach(() => {
        element.find('[ng-model="tagsInputVM.searchText"]').val('shopping').trigger('input');
      });

      it('should be one tag in suggestions', () => {
        expect(tagsInputController.suggestions).toEqual(tagsArray.slice(0, 1));
      });

      it('should add active class to suggested tag', () => {
        expect(element.find('.list-group-item.suggested-tag:eq(0)').hasClass('active')).toBeTruthy();
      });

      describe('click enter', () => {
        beforeEach(() => {
          triggerKeyDown(ENTER_KEY);
        });

        it('should clean input', () => {
          expect(element.find('[ng-model="tagsInputVM.searchText"]').val()).toBe('');
        });

        it('should clean suggestions', () => {
          expect(tagsInputController.suggestions).toEqual([]);
        });

        it('should add selected tag', () => {
          expect(element.find('.tag.label.label-primary').text()).toContain(tagsArray[0].name);
        });

        it('should remove selected tag from allTags', () => {
          expect(tagsInputController.allTags).not.toContain(tagsArray[0]);
        });
      });
    });

    describe('Type "newTag" in input', () => {
      const newTag = {
        id: 5,
        name: 'newtag'
      };

      beforeEach(() => {
        element.find('[ng-model="tagsInputVM.searchText"]').val('newTag').trigger('input');
      });

      it('should not be any tag in suggestions', () => {
        expect(tagsInputController.suggestions).toEqual([]);
      });

      describe('click enter', () => {
        beforeEach(() => {
          triggerKeyDown(ENTER_KEY);
          successCallbackCreate({ data: newTag });
          $scope.$digest();
        });

        it('should clean input', () => {
          expect(element.find('[ng-model="tagsInputVM.searchText"]').val()).toBe('');
        });

        it('should clean suggestions', () => {
          expect(tagsInputController.suggestions).toEqual([]);
        });

        it('should add newTag to selected tags', () => {
          expect(element.find('.tag.label.label-primary').text()).toContain(newTag.name);
        });
      });
    });
  });

  describe('With tags at the begining', () => {
    beforeEach(() => {
      compileElement(tagsArray.slice(0, 2));
      successCallback({ data: angular.copy(tagsArray) });
    });

    it('should remove ngModel from allTags', () => {
      const expectedArray = angular.copy(tagsArray);
      expect(tagsInputController.allTags).toEqual(expectedArray.splice(2, 2));
    });
  });

  describe('With name', () => {
    const formName = 'super';
    beforeEach(() => {
      compileElement([], formName);
      successCallback({ data: angular.copy(tagsArray) });
    });

    it('should compile', () => {
      expect(element).toBeTruthy();
    });

    it('should set formController to this.form with proper name', () => {
      expect(tagsInputController.form.$name).toBe(formName);
    });
  });

  describe('With ng-change', () => {
    const someFunction = jasmine.createSpy();

    beforeEach(() => {
      compileElement([], 'formName', someFunction);
      successCallback({ data: angular.copy(tagsArray) });
    });

    it('should compile', () => {
      expect(element).toBeTruthy();
    });

    describe('modify ngModel', () => {
      beforeEach(() => {
        tagsInputController.ngModel.push('hashtag');
        $scope.$digest();
      });

      it('should call ngChange', () => {
        expect(someFunction).toHaveBeenCalled();
      });
    });
  });

  function compileElement(tags, name, someFunction) {
    inject(function(_$compile_, _$rootScope_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope;
      $scope.tags = tags;
      $scope.name = name;
      $scope.someFunction = someFunction;
      const ngChange = someFunction ? 'ng-change="someFunction()"' : '';
      element = angular.element(`<tags-input
        ng-model="tags"
        name="{{ name }}"
        ${ngChange}
        ></tags-input>`);
      $compile(element)($scope);
      angular.element(document.body).append(element);
      $scope.$digest();
      tagsInputController = element.controller('tagsInput');
    });
  }

  function triggerKeyDown(keyCode) {
    const event = {
      preventDefault: angular.noop,
      keyCode: keyCode
    };
    tagsInputController.checkKeyDown(event);
    $scope.$digest();
  };
});
