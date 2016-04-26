export const Injector = {
  instances: {},

  add<T>(Class: { new(...args: any[]): T }, ...args) {
    const className = new Class().constructor.name;
    const instances = args.map((item) => this.get(item));
    if (!this.instances[className]) {
      this.instances[className] = new Class(...instances);
    }
  },

  get<T>(Class: { new(...args: any[]): T }): T {
    const className = new Class().constructor.name;
    return this.instances[className];
  }
};


export function Inject(label: any) {
  return function (target: any, key: string) {
    Object.defineProperty(target, key, {
      get: () => Injector.get(label)
    });
  }
}
