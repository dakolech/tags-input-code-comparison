import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';
import { GetFiles } from '../services/get-files.ts';
import { ShowPopup } from '../services/show-popup.ts';
import { Subject } from 'rxjs';
import { PopUp } from './popup.ts';

class Menu {
  public compare: Subject<Event> = new Subject();
  public popupVisible: boolean = false;

  constructor(
    private CompareService: CompareService,
    private GetFiles: GetFiles,
    private PopUp,
    public ShowPopup: ShowPopup
  ) {
    this.compare
      .withLatestFrom(this.CompareService.toCompare, (event, names) => names)
      .withLatestFrom(this.GetFiles.files, (toCompare, files) => toCompare.map((name) => {
        const filesObject = files[name];
        filesObject.name = name;
        return filesObject;
      }))
      .filter((item) => !!item && !!item.length)
      .subscribe((item) => {
        Component.create('pop-up', new this.PopUp(item));
        this.ShowPopup.push(true);
      });
  }
}

Component.create('.menu', new Menu(
  Injector.get(CompareService), Injector.get(GetFiles), PopUp, Injector.get(ShowPopup)));
