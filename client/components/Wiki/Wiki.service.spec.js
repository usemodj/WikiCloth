'use strict';

describe('Service: Wiki', function () {

  // load the service's module
  beforeEach(module('wikiClothApp'));

  // instantiate service
  var Wiki;
  beforeEach(inject(function (_Wiki_) {
    Wiki = _Wiki_;
  }));

  it('should do something', function () {
    expect(!!Wiki).to.be.true;
  });

});
