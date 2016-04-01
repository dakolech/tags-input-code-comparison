import '../shared/shared-libs';

import 'rxjs';
import 'zone.js';
import 'es6-shim';
import 'es6-promise';
import 'reflect-metadata';
import { bootstrap } from 'angular2/platform/browser';
import App from './app';
import { HTTP_BINDINGS } from "angular2/http";

bootstrap(App, [
  HTTP_BINDINGS
]);
