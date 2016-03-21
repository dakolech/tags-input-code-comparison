describe('Service: tagsService', function() {
var
    tagsService,
    mockedRestangular = {
    all: angular.noop
    },
    simpleTag = {
    id: 1,
    name: 'superGoal'
    },
    postObject,
    tagsURL = 'tags',
    getListCalled;

beforeEach(module('bucketList.tags', {
    Restangular: mockedRestangular
}));

beforeEach(inject(function($injector) {
    tagsService = $injector.get('tagsService');
    postObject = {};
    getListCalled = false;
}));

it('should initialize', function() {
    expect(!!tagsService).toBeTruthy();
});

describe('createOne method', function() {
    beforeEach(function() {
    spyOn(mockedRestangular, 'all').and.returnValue({
        post: function(sendObject) {
        postObject = sendObject;
        }
    });

    tagsService.createOne(simpleTag);
    });

    it('should call all method on Restangular with tagsURL', function() {
    expect(mockedRestangular.all).toHaveBeenCalledWith(tagsURL);
    });

    it('should call post method on Restangular.all with simpleTag', function() {
    expect(postObject).toEqual(postObject);
    });
});

describe('getAllTags method', function() {
    beforeEach(function() {
    spyOn(mockedRestangular, 'all').and.returnValue({
        getList: function() {
        getListCalled = true;
        }
    });

    tagsService.getAllTags();
    });

    it('should call all method on Restangular with tagsURL', function() {
    expect(mockedRestangular.all).toHaveBeenCalledWith(tagsURL);
    });

    it('should call getList method on Restangular.all', function() {
    expect(getListCalled).toBe(true);
    });
});
});
