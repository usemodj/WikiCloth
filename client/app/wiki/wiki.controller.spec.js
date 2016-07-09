'use strict';

describe('Component: WikiComponent', function () {

  // load the controller's module
  beforeEach(module('wikiClothApp'));

  var WikiComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    WikiComponent = $componentController('wiki', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
