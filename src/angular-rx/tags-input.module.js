import angular from 'angular';
import rxAngular from 'rx-angular';
import rxAll from 'rx';
import tagsService from './service/tags.service';
import tagsInput from './component/tags-input.component';

angular.module('tagsInput', [
    tagsService.name,
    tagsInput.name,
    'rx'
]);