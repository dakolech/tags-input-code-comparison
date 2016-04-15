class InjectorClass {
  private static instance: InjectorClass;
  public instances: Object = {};

  static get Instance() {
      if (this.instance === null || this.instance === undefined) {
          this.instance = new InjectorClass();
      }
      return this.instance;
  }

  add<T>(Class: { new(...args: any[]): T }, ...args) {
    const className = new Class().constructor.name;
    const instances = args.map((item) => this.get(item));
    if (!this.instances[className]) {
      this.instances[className] = new Class(...instances);
    }
  }

  get<T>(Class: { new(...args: any[]): T }): T {
    const className = new Class().constructor.name;
    return this.instances[className];
  }
}

export const Injector = InjectorClass.Instance;
