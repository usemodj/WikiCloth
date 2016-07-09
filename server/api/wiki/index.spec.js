'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var wikiCtrlStub = {
  index: 'wikiCtrl.index',
  show: 'wikiCtrl.show',
  create: 'wikiCtrl.create',
  update: 'wikiCtrl.update',
  destroy: 'wikiCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var wikiIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './wiki.controller': wikiCtrlStub
});

describe('Wiki API Router:', function() {

  it('should return an express router instance', function() {
    expect(wikiIndex).to.equal(routerStub);
  });

  describe('GET /api/wikis', function() {

    it('should route to wiki.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'wikiCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/wikis/:id', function() {

    it('should route to wiki.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'wikiCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/wikis', function() {

    it('should route to wiki.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'wikiCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/wikis/:id', function() {

    it('should route to wiki.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'wikiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/wikis/:id', function() {

    it('should route to wiki.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'wikiCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/wikis/:id', function() {

    it('should route to wiki.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'wikiCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
