import { Injectable } from '../lib/injector.ts';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
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
