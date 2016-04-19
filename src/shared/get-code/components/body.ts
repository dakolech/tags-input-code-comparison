import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { Subject } from 'rxjs';

class Body {
  constructor(
    public ShowPopup: ShowPopup
  ) {
  }

  public hidePopup(event) {
    this.ShowPopup.push(false);
    const popupElement = document.querySelector('pop-up');
    popupElement.removeChild(popupElement.querySelector('.popup'));
  }
}

Component.create('body', new Body(Injector.get(ShowPopup)));
