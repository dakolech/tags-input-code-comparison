import '../shared';

import 'angular';
import 'rx-angular';
import 'rx';

import tagsService from './service/tags.service';
import tagsInput from './component/tags-input.component';


angular.module('tagsInputRx', [
  tagsService.name,
  tagsInput.name,
  'rx'
]);
