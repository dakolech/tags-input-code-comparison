import tagsInputController from './tags-input.ctrl';
import tagsInputService from './tags-input.service';

const componentName = 'tagsInput';

const tagsInput = {
  restrict: 'AE',
  replace: true,
  scope: {},
  templateUrl: 'component/tags-input.html',
  bindings: {
    ngModel: '=?',
    name: '@?',
    placeholder: '@?',
    ngChange: '&?'
  },
  controllerAs: 'tagsInputVM',
  controller: 'tagsInputController'
};

export default angular.module('tagsInputComponent', [])
  .controller('tagsInputController', tagsInputController)
  .service('tagsInputService', tagsInputService)
  .component(componentName, tagsInput);
