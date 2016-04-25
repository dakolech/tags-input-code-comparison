import { Component, DOMComponent } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { Subject } from 'rxjs';
import { Router } from '../lib/router.ts';

class Body extends DOMComponent {
  constructor(
    public ShowPopup: ShowPopup
  ) {
    super();
  }

  public hidePopup(event) {
    Router.go('main');
  }
}

Component.create('body', new Body(Injector.get(ShowPopup)));
