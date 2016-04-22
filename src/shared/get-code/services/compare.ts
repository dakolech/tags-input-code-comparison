import { Injector } from '../lib/injector.ts';
import { BehaviorSubject, Subject } from 'rxjs';
import { GetFiles } from './get-files.ts';

export class CompareService {
  public toCompare: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public compareNames: Subject<string> = new Subject();

  constructor(
    private GetFiles: GetFiles
  ) {
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
      .filter((files) => !!files && !!files.length)
  }
}

Injector.add(CompareService, GetFiles);
