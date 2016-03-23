import componentModule from './tags-input.component';

const DOWN_KEY = 40;
const UP_KEY = 38;
const ENTER_KEY = 13;
const CTRL_KEY = 17;
const BACKSPACE_KEY = 8;

describe('Directive: tagsInput', function() {
  let $compile, element, $rootScope, $scope, $timeout, tagsInputController;
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
    getAllTags: () => new Rx.BehaviorSubject({ data: angular.copy(tagsArray) }),
    createOne: new Rx.Subject
  };

  beforeEach(window.module('templates'));
  beforeEach(window.module('rx'));
  beforeEach(module('tagsInputComponent', {
    tagsService: mockedTagsService
  }));

  $compile = {};
  $rootScope = {};
  element = {};
  $scope = {};

  describe('Without tags at the begining', function() {
    beforeEach(function() {
      compileElement([]);
    });

    it('should compile', function() {
      expect(element).toBeTruthy();
    });

    it('should set ngModel to an empty array', function() {
      expect(tagsInputController.ngModel).toEqual([]);
    });

    it('should set selectedIndex to -1', function() {
      expect(tagsInputController.selectedIndex).toBe(-1);
    });

    describe('click enter with empty input', function() {
      beforeEach(function() {
        triggerKeyDown(ENTER_KEY);
        $timeout.flush();
      });

      it('should not change selectedIndex', function() {
        expect(tagsInputController.selectedIndex).toBe(-1);
      });

      it('should not add tag', function() {
        expect(tagsInputController.ngModel).toEqual([]);
      });
    });

    describe('click enter with invalid input', function() {
      beforeEach(function() {
        element.find('[ng-model="tagsInputVM.searchText"]').val('ho').trigger('input');
        tagsInputController.form.tag.$setValidity('specialChars', false);
        triggerKeyDown(ENTER_KEY);
        $timeout.flush();
      });

      it('should not change selectedIndex', function() {
        expect(tagsInputController.selectedIndex).toBe(-1);
      });

      it('should not add tag', function() {
        expect(tagsInputController.ngModel).toEqual([]);
      });
    });

    describe('call search method with empty searchText', function() {
      beforeEach(function() {
        tagsInputController.search();
      });

      it('should clean suggestions', function() {
        expect(tagsInputController.suggestions).toEqual([]);
      });
    });

    describe('Type "ho" in input', function() {
      beforeEach(function() {
        element.find('[ng-model="tagsInputVM.searchText"]').val('ho').trigger('input');
      });

      it('should be two tags in suggestions', function() {
        expect(tagsInputController.suggestions).toEqual(tagsArray.slice(0, 2));
      });

      describe('click keydown two times', function() {
        beforeEach(function() {
          triggerKeyDown(DOWN_KEY);
          triggerKeyDown(DOWN_KEY);
        });

        it('should set selectedIndex to 1', function() {
          expect(tagsInputController.selectedIndex).toBe(1);
        });

        it('should add active class to second suggested tag', function() {
          expect(element.find('.list-group-item.suggested-tag:eq(1)').hasClass('active')).toBeTruthy();
        });

        describe('click keyup two times', function() {
          beforeEach(function() {
            triggerKeyDown(UP_KEY);
            triggerKeyDown(UP_KEY);
          });

          it('should set selectedIndex to 0', function() {
            expect(tagsInputController.selectedIndex).toBe(0);
          });

          it('should add active class to first suggested tag', function() {
            expect(element.find('.list-group-item.suggested-tag:eq(0)').hasClass('active')).toBeTruthy();
          });
        });

        describe('click keydown one more time', function() {
          beforeEach(function() {
            triggerKeyDown(DOWN_KEY);
          });

          it('should not change selectedIndex', function() {
            expect(tagsInputController.selectedIndex).toBe(1);
          });

          it('should not remove active class from second suggested tag', function() {
            expect(element.find('.list-group-item.suggested-tag:eq(1)').hasClass('active')).toBeTruthy();
          });
        });

        describe('click ctrl key', function() {
          beforeEach(function() {
            triggerKeyDown(CTRL_KEY);
          });

          it('should not change selectedIndex', function() {
            expect(tagsInputController.selectedIndex).toBe(1);
          });

          it('should not add tag', function() {
            expect(tagsInputController.ngModel).toEqual([]);
          });
        });

        describe('click enter', function() {
          beforeEach(function() {
            triggerKeyDown(ENTER_KEY);
            $timeout.flush();
          });

          it('should clean input', function() {
            expect(element.find('[ng-model="tagsInputVM.searchText"]').val()).toBe('');
          });

          it('should clean suggestions', function() {
            expect(tagsInputController.suggestions).toEqual([]);
          });

          it('should add selected tag', function() {
            expect(element.find('.tag.label.label-primary').text()).toContain(tagsArray[1].name);
          });

          describe('remove tag', function() {
            beforeEach(function() {
              element.find('.tag.label.label-primary b.remove').click();
              $timeout.flush();
            });

            it('should remove tag from ngModel', function() {
              expect(tagsInputController.ngModel).toEqual([]);
            });
          });
        });
      });
    });

    describe('Type "shopping" in input', function() {
      beforeEach(function() {
        element.find('[ng-model="tagsInputVM.searchText"]').val('shopping').trigger('input');
      });

      it('should be one tag in suggestions', function() {
        expect(tagsInputController.suggestions).toEqual(tagsArray.slice(0, 1));
      });

      it('should add active class to suggested tag', function() {
        expect(element.find('.list-group-item.suggested-tag:eq(0)').hasClass('active')).toBeTruthy();
      });

      describe('click donw key and enter', function() {
        beforeEach(function() {
          triggerKeyDown(DOWN_KEY);
          triggerKeyDown(ENTER_KEY);
          $timeout.flush();
        });

        it('should clean input', function() {
          expect(element.find('[ng-model="tagsInputVM.searchText"]').val()).toBe('');
        });

        it('should clean suggestions', function() {
          expect(tagsInputController.suggestions).toEqual([]);
        });

        it('should add selected tag', function() {
          expect(element.find('.tag.label.label-primary').text()).toContain(tagsArray[0].name);
        });
      });
    });

    describe('Type "newTag" in input', function() {
      let newTag = {
        id: 5,
        name: 'newtag'
      };

      beforeEach(function() {
        element.find('[ng-model="tagsInputVM.searchText"]').val('newTag').trigger('input');
      });

      it('should not be any tag in suggestions', function() {
        expect(tagsInputController.suggestions).toEqual([]);
      });

      describe('click enter', function() {
        beforeEach(function() {
          triggerKeyDown(ENTER_KEY);
          mockedTagsService.createOne.onNext({ data: newTag });
          $scope.$digest();
          $timeout.flush();
        });

        it('should clean input', function() {
          expect(element.find('[ng-model="tagsInputVM.searchText"]').val()).toBe('');
        });

        it('should clean suggestions', function() {
          expect(tagsInputController.suggestions).toEqual([]);
        });

        it('should add newTag to selected tags', function() {
          expect(element.find('.tag.label.label-primary').text()).toContain(newTag.name);
        });
      });
    });
  });


  describe('With name', function() {
    let formName = 'super';
    beforeEach(function() {
      compileElement([], formName);
    });

    it('should compile', function() {
      expect(element).toBeTruthy();
    });

    it('should set formController to this.form with proper name', function() {
      expect(tagsInputController.form.$name).toBe(formName);
    });
  });

  describe('With ng-change', function() {
    let someFunction = jasmine.createSpy();

    beforeEach(function() {
      compileElement([], 'formName', someFunction);
    });

    it('should compile', function() {
      expect(element).toBeTruthy();
    });

    describe('modify ngModel', function() {
      beforeEach(function() {
        tagsInputController.ngModel.push('hashtag');
        $scope.$digest();
      });

      it('should call ngChange', function() {
        expect(someFunction).toHaveBeenCalled();
      });
    });
  });

  function compileElement(tags, name, someFunction) {
    inject(function(_$compile_, _$rootScope_, _$timeout_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $scope = $rootScope;
      $scope.tags = tags;
      $scope.name = name;
      $timeout = _$timeout_;
      $scope.someFunction = someFunction;
      let ngChange = someFunction ? 'ng-change="someFunction()"' : '';
      element = angular.element(`<tags-input
        ng-model="tags"
        name="{{name}}"
        ${ngChange}
        ></tags-input>`);
      $compile(element)($scope);
      angular.element(document.body).append(element);
      $scope.$digest();
      tagsInputController = element.controller('tagsInput');
    });
  }

  function triggerKeyDown(keyCode) {
    let event = {
      preventDefault: angular.noop,
      keyCode: keyCode
    };
    tagsInputController.checkKeyDown(event);
    $scope.$digest();
  };
});