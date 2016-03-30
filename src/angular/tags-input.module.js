import '../shared';

import 'angular';

import tagsService from './service/tags.service';
import tagsInput from './component/tags-input.component';

angular.module('tagsInput', [
  tagsService.name,
  tagsInput.name
]);
