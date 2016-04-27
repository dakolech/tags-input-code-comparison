export const Injector = {
  instances: {},

  add<T>(Class: { new(...args: any[]): T }) {
    const className = new Class().constructor.name;
    if (!this.instances[className]) {
      this.instances[className] = new Class();
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
  };
}

export function Injectable() {
  return (target) => {
    Injector.add(target);
    return target;
  };
}
