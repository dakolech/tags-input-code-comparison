import tagsInputController from './tags-input.ctrl';
import tagsInputService from './tags-input.service';

import template from './tags-input.jade';

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
  controller: tagsInputController
};

export default angular.module('tagsInputComponentRx', [])
  .service('tagsInputService', tagsInputService)
  .component(componentName, tagsInput);
