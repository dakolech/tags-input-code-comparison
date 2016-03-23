const serviceName = 'tagsService';

class tagsService {
  constructor($http, rx) {
    this.$http = $http;
    this.rx = rx;
    this._colletionName = '/tags';
  }

  createOne(tag) {
    return this.rx.Observable.fromPromise(this.$http.post(this._colletionName, { name: tag }))
        .map((resp) => resp.data);
  }

  getAllTags() {
    return this.rx.Observable.fromPromise(this.$http.get(this._colletionName));
  }
}

tagsService.$inject = ['$http', 'rx'];

export default angular.module('tagsInputService', [])
    .service(serviceName, tagsService);
