import { Injector } from '../lib/injector.ts';
import { BehaviorSubject, Subject } from 'rxjs';

export class CompareService {
  public toCompare: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public compareNames: Subject<string> = new Subject();

  constructor() {
    this.subscribeCompareNames();
  }

  public push(name) {
    this.compareNames.next(name);
  }

  private subscribeCompareNames() {
    this.compareNames.withLatestFrom(this.toCompare, (name, names) => {
      !~names.indexOf(name) ?
        names.push(name) :
        names = names.filter((item: string) => item !== name);
      return names;
    }).subscribe((names) => this.toCompare.next(names));
  }
}

Injector.add(CompareService);
