'use strict';

describe('Directive: fileupload', function () {

  // load the directive's module
  beforeEach(module('wikiClothApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fileupload></fileupload>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the fileupload directive');
  }));
});
