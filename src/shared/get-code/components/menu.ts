import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { Subject } from 'rxjs';

class Menu {
  public compare: Subject<Event> = new Subject();

  constructor(private CompareService: CompareService) {

    this.compare.withLatestFrom(CompareService.toCompare, (event, names) => names)
      .subscribe((item) => console.log(item));    
  }
}

Component.create('.menu', new Menu(Injector.get(CompareService)));
