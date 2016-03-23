import serviceModule from './tags.service';

xdescribe('Service: tagsService', () => {
  let tagsService;
  const mockedHttp = {
    get: angular.noop,
    post: angular.noop
  };
  const simpleTag = 'superGoal';
  const tagsURL = '/tags';

  beforeEach(window.module(serviceModule.name, {
    $http: mockedHttp
  }));

  beforeEach(inject(function($injector) {
    tagsService = $injector.get('tagsService');
  }));

  it('should initialize', () => {
    expect(!!tagsService).toBeTruthy();
  });

  describe('createOne method', () => {
    beforeEach(() => {
      spyOn(mockedHttp, 'post').and.callThrough();
      tagsService.createOne(simpleTag);
    });

    it('should call post method on $hhtp with tagsURL and tag object', () => {
      expect(mockedHttp.post).toHaveBeenCalledWith(tagsURL, { name: simpleTag });
    });
  });

  describe('getAllTags method', () => {
    beforeEach(() => {
      spyOn(mockedHttp, 'get').and.callThrough();
      tagsService.getAllTags();
    });

    it('should call get method on $hhtp with tagsURL', () => {
      expect(mockedHttp.get).toHaveBeenCalledWith(tagsURL);
    });
  });
});
