import '../shared/shared-libs';

import 'rxjs';
import 'zone.js';
import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import { bootstrap } from 'angular2/platform/browser';
import App from './app';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS, BaseRequestOptions, RequestOptions } from 'angular2/http';

import TagsService from './service/tags.service';


class MyRequestOptions extends BaseRequestOptions {
  constructor() {
    super();
    this.headers.append('Content-Type', 'application/json;charset=UTF-8');
  }
}

bootstrap(App, [
  HTTP_PROVIDERS,
  provide(RequestOptions, { useClass: MyRequestOptions }),
  TagsService
]);
