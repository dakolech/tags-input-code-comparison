declare class BetterElement extends Element {
  public name: string;
}

declare class ConfigListElement {
  public name: string;
  public title: string;
  public imageHMTL: string;
  public row: number;
  public colWidth: number;
}

declare function require (id: string): any;
