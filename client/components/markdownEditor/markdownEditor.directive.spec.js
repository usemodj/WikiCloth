'use strict';

describe('Directive: markdownEditor', function () {

  // load the directive's module
  beforeEach(module('wikiClothApp.markdownEditor'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<markdown-editor></markdown-editor>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the markdownEditor directive');
  }));
});
