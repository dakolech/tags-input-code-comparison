import { Inject, Injectable } from '../lib/injector.ts';
import { BehaviorSubject, Subject } from 'rxjs';
import { GetFiles } from './get-files.ts';
import { codesArray } from '../config.ts';

@Injectable()
export class CompareService {
  public toCompare: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public compareNames: Subject<string> = new Subject();
  @Inject(GetFiles)
  private GetFiles: GetFiles;

  constructor() {
    this.subscribeCompareNames();
  }

  public push(name: string) {
    this.compareNames.next(name);
  }

  public pushStringArray(names: string) {
    const namesArray = names.split('_');
    const codesNames = codesArray.map((code) => code.name);
    namesArray
      .filter((param) => !!~codesNames.indexOf(param))
      .forEach((param) => this.compareNames.next(param));
  }

  private subscribeCompareNames() {
    this.compareNames.withLatestFrom(this.toCompare, (name, names) => {
      !~names.indexOf(name) ?
        names.push(name) :
        names = names.filter((item: string) => item !== name);
      return names;
    }).subscribe((names) => this.toCompare.next(names));
  }

  public get files() {
    return this.toCompare
      .combineLatest(this.GetFiles.files, (toCompare, files) =>
        toCompare
          .filter((name) => !!files[name])
          .map((name) => {
            const filesObject = files[name];
            if (!!filesObject) {
              filesObject.name = name;
            }
            return filesObject;
          })
      )
      .filter((files) => !!files && !!files.length);
  }
}

// Injector.add(CompareService, GetFiles);
