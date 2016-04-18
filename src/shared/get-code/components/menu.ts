import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { GithubFiles } from '../services/github-files.ts';
import { Subject } from 'rxjs';
import { PopUp } from './popup.ts';

class Menu {
  public compare: Subject<Event> = new Subject();
  public popupVisible: boolean = false;

  constructor(
    private CompareService: CompareService,
    private GithubFiles: GithubFiles,
    private PopUp
  ) {

    this.compare
      .withLatestFrom(this.CompareService.toCompare, (event, names) => names)
      .withLatestFrom(this.GithubFiles.files, (toCompare, files) => toCompare.map((name) => {
        const filesObject = files[name];
        filesObject.name = name;
        return filesObject;
      }))
      .filter((item) => !!item && !!item.length)
      .subscribe((item) => {
        if (!this.popupVisible) {
          Component.create('pop-up', new this.PopUp(item));
          this.popupVisible = !this.popupVisible;
        }
      });
  }

  private constructFiles(toCompare, files) {
    return toCompare.map((name) => files[name]);
  }
}

Component.create('.menu', new Menu(Injector.get(CompareService), Injector.get(GithubFiles), PopUp));
