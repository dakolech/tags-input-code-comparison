import { Component, DOMComponent } from '../lib/components.ts';
import { Inject } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { Subject } from 'rxjs';
import { Router } from '../lib/router.ts';

class Menu extends DOMComponent {
  public compare: Subject<Event> = new Subject();
  public popupVisible: boolean = false;

  @Inject(CompareService)
  private CompareService: CompareService;

  constructor() {
    super();
    this.compare
      .withLatestFrom(this.CompareService.toCompare, (event, files) => files)
      .filter((files) => !!files.length)
      .subscribe((files) => {
        Router.go('popUp', { names: files.join('_') });
      });
  }
}

Component.create('.menu', new Menu());
