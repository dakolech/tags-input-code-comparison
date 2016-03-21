import tagsInputController from './tags-input.ctrl';

const componentName = 'tagsInput';

const tagsInput = {
  restrict: 'AE',
  replace: true,
  scope: {},
  templateUrl: 'tags-input',
  bindToController: {
  ngModel: '=',
  name: '@',
  placeholder: '@?',
  ngChange: '&?'
  },
  controllerAs: 'tagsInputVM',
  controller: 'tagsInputController'
};

export default angular.module('tagsInputComponent', [])
  .controller('tagsInputController', tagsInputController)
  .component(componentName, tagsInput);
