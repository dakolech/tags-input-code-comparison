import { Component, DOMComponent } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { GetFiles } from '../services/get-files.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { Subject } from 'rxjs';
import { PopUp } from './popup.ts';

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
      .subscribe((files) => {
        Component.create('pop-up', new this.PopUp(this.CompareService, this.ShowPopup));
      });
  }
}

Component.create('.menu', new Menu(
  Injector.get(CompareService), Injector.get(GetFiles), PopUp, Injector.get(ShowPopup)));
