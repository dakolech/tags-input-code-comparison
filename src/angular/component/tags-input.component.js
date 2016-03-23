import tagsInputController from './tags-input.ctrl';

import template from 'jade!./tags-input.jade';

const componentName = 'tagsInput';

const tagsInput = {
  restrict: 'AE',
  replace: true,
  scope: {},
  template: template(),
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
  .component(componentName, tagsInput);
