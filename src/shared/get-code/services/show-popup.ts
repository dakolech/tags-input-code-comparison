import { Injector } from '../lib/injector.ts';
import { BehaviorSubject } from 'rxjs';

export class ShowPopup {
  public isVisible: BehaviorSubject<string> = new BehaviorSubject('hide');

  public push(value: boolean) {
    this.isVisible.next(value ? '' : 'hide');
  }
}

Injector.add(ShowPopup);
