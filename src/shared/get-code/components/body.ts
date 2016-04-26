import { Component, DOMComponent } from '../lib/components.ts';
import { Inject } from '../lib/injector.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { Router } from '../lib/router.ts';

class Body extends DOMComponent {
  @Inject(ShowPopup)
  public ShowPopup: ShowPopup;

  constructor() {
    super();
  }

  public hidePopup(event) {
    Router.go('main');
  }
}

Component.create('body', new Body());
