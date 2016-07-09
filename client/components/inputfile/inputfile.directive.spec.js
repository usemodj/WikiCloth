'use strict';

describe('Directive: inputfile', function () {

  // load the directive's module and view
  beforeEach(module('wikiClothApp'));
  beforeEach(module('components/inputfile/inputfile.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<inputfile></inputfile>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the inputfile directive');
  }));
});
