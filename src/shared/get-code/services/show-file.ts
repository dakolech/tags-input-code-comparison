import { Injector } from '../lib/injector.ts';
import { BehaviorSubject, Subject } from 'rxjs';

export class ShowFile {
  private observablesObject: Object = {};

  public init(nameArray) {
    nameArray.forEach((name) => {
      this.observablesObject[name] = new BehaviorSubject('Choose file');
    });
  }

  public get(name) {
    return this.observablesObject[name];
  }
}

Injector.add(ShowFile);
