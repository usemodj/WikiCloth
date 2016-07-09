'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var commentCtrlStub = {
  index: 'commentCtrl.index',
  show: 'commentCtrl.show',
  create: 'commentCtrl.create',
  update: 'commentCtrl.update',
  destroy: 'commentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var commentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './comment.controller': commentCtrlStub
});

describe('Comment API Router:', function() {

  it('should return an express router instance', function() {
    expect(commentIndex).to.equal(routerStub);
  });

  describe('GET /api/comments', function() {

    it('should route to comment.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'commentCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/comments/:id', function() {

    it('should route to comment.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'commentCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/comments', function() {

    it('should route to comment.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'commentCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/comments/:id', function() {

    it('should route to comment.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'commentCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/comments/:id', function() {

    it('should route to comment.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'commentCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/comments/:id', function() {

    it('should route to comment.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'commentCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
