'use strict';

describe('Service: Talk', function () {

  // load the service's module
  beforeEach(module('wikiClothApp'));

  // instantiate service
  var Talk;
  beforeEach(inject(function (_Talk_) {
    Talk = _Talk_;
  }));

  it('should do something', function () {
    expect(!!Talk).to.be.true;
  });

});
