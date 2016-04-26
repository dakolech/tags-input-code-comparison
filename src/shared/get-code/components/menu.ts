import { Component, DOMComponent } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { GetFiles } from '../services/get-files.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { Subject } from 'rxjs';
import { PopUp } from './popup.ts';
import { Router } from '../lib/router.ts';

class Menu extends DOMComponent {
  public compare: Subject<Event> = new Subject();
  public popupVisible: boolean = false;

  constructor(
    private CompareService: CompareService,
    private GetFiles: GetFiles,
    private PopUp,
    public ShowPopup: ShowPopup
  ) {
    super();
    this.compare
      .withLatestFrom(this.CompareService.toCompare, (event, files) => files)
      .filter((files) => !!files.length)
      .subscribe((files) => {
        Router.go('popUp', { names: files.join('_') });
      });
  }
}

Component.create('.menu', new Menu(
  Injector.get(CompareService), Injector.get(GetFiles), PopUp, Injector.get(ShowPopup)));
