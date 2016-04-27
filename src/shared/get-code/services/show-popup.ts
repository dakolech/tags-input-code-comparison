import { Injectable } from '../lib/injector.ts';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShowPopup {
  public isVisible: BehaviorSubject<string> = new BehaviorSubject('hide');

  public push(value: boolean) {
    this.isVisible.next(value ? '' : 'hide');
  }
}
