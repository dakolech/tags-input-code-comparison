import { Router } from './lib/router.ts';
import { Injector } from './lib/injector.ts';
import { Component } from './lib/components.ts';
import { PopUp } from './components/popup.ts';
import { CompareService } from './services/compare.ts';
import { ShowPopup } from './services/show-popup.ts';

Router.add({
  name: 'main',
  path: '/',
  handler: (params: any) => {
    Injector.get(ShowPopup).push(false);
  }
});

Router.add({
  name: 'popUp',
  path: '/compare/:names',
  handler: (params: any, fromState: State) => {
    if (!!params && params.names && fromState.name !== 'main') {
      Injector.get(CompareService).pushStringArray(params.names);
    }
    Component.create('pop-up', new PopUp());
  }
});

Router.listen();
