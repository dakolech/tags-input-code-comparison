import { Component } from '../lib/components.ts';
import { Injector } from '../lib/injector.ts';
import { CompareService } from '../services/compare.ts';

export class FilesList {
  private codesArray: string[];

  constructor(
    private filesObject
  ) {
    console.log(this.filesObject)
  }

  public render() {
    return `
      <div> FilesList component </div>
    `;
  }
}

// export const PopUpComponent = new PopUp(Injector.get(CompareService));
