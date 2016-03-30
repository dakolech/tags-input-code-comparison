const serviceName = 'tagsService';

class tagsService {
  constructor($http) {
    this.$http = $http;
    this._colletionName = '/tags';
  }

  createOne(tag) {
    return this.$http.post(this._colletionName, { name: tag });
  }

  getAllTags() {
    return this.$http.get(this._colletionName);
  }
}

tagsService.$inject = ['$http'];

export default angular.module('tagsInputService', [])
    .service(serviceName, tagsService);
