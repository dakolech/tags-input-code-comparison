class InjectorClass {
  public instances: Object = {};
  private static instance: InjectorClass;
  
  static get Instance() {
      if (this.instance === null || this.instance === undefined) {
          this.instance = new InjectorClass();
      }
      return this.instance;
  }

  add<T>(Class: { new(...args: any[]): T }, ...args) {
    const className = Class.constructor.toString().match(/\w+/g)[1];
    const instances = args.map((item) => this.get(item));
    this.instances[className] = new Class(...instances);
  }
  
  get<T>(Class: { new(...args: any[]): T }): T {
    const className = Class.constructor.toString().match(/\w+/g)[1];    
    return this.instances[className];
  }
}

export const Injector = InjectorClass.Instance;
