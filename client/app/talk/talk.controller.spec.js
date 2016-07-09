'use strict';

describe('Component: TalkComponent', function () {

  // load the controller's module
  beforeEach(module('wikiClothApp'));

  var TalkComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    TalkComponent = $componentController('talk', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
