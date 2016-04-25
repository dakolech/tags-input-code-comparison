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

declare class CodeFile {
  public path: string;
  public content: string;
  public name: string;
  public size: number;
  public url: string;
  public download: string;
}

declare class State {
  public path: string;
  public name: string;
  public handler: Function;
}