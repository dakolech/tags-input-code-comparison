export const Router = {
  states: <State[]>[],
  currentState: <string>'',

  add(state: State) {
    this.states.push(state);
  },

  listen() {
    const foundState = this.states.find((state: State) => this.equalPaths(state.path, window.location.pathname));
    if (!!foundState) {
      var stateParams = foundState.path.split('/');
      var urlParams = window.location.pathname.split('/');
      var params = {};
      stateParams.forEach((stateParam, index) => {
        if (stateParam.indexOf(':') === 0) {
          params[stateParam.slice(1, stateParam.length)] = urlParams[index];
        }
      });
      this.go(foundState, params);
    }
  },

  equalPaths(statePath, urlPath) {
    const stateParams = statePath.split('/');
    const urlParams = urlPath.split('/');
    let isEqual = true;

    stateParams.forEach((stateParam, index) => {
      if (stateParam.indexOf(':') !== 0 && stateParam !== urlParams[index]) {
        isEqual = false;
      }
    });
    return isEqual;
  },

  go(state: any, params?: Object) {
    if (typeof state === 'string') {
      state = this.states.find((item: State) => item.name === state);
    }

    state.handler(params, this.currentState);
    this.currentState = state;
    if (!this.equalPaths(state.path, window.location.pathname)) {
      const stateParams = state.path.split('/');
      const urlParams = window.location.pathname.split('/');
      const url = stateParams
        .map((stateParam, index) =>
          stateParam.indexOf(':') === 0 ? params[stateParam.slice(1, stateParam.length)] : stateParam
        ).join('/');
      window.history.pushState(null, null, url);
    }
  }
};
