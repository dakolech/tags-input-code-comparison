import '../shared/shared-libs';

import 'rxjs';
import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'reflect-metadata';
import { bootstrap } from 'angular2/platform/browser';
import App from './app.ts';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS, BaseRequestOptions, RequestOptions } from 'angular2/http';

import TagsService from './service/tags.service.ts';


class MyRequestOptions extends BaseRequestOptions {
  constructor () {
    super();
    this.headers.append('Content-Type', 'application/json;charset=UTF-8');
  }
}

bootstrap(App, [
  HTTP_PROVIDERS,
  provide(RequestOptions, { useClass: MyRequestOptions }),
  TagsService
]);
