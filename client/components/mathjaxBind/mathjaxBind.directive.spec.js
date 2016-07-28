'use strict';

describe('Directive: mathjaxBind', function () {

  // load the directive's module
  beforeEach(module('wikiClothApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<mathjax-bind></mathjax-bind>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the mathjaxBind directive');
  }));
});
