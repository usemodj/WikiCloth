'use strict';

var app = require('../..');
import request from 'supertest';

var newWiki;

describe('Wiki API:', function() {

  describe('GET /api/wikis', function() {
    var wikis;

    beforeEach(function(done) {
      request(app)
        .get('/api/wikis')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          wikis = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(wikis).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/wikis', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/wikis')
        .send({
          name: 'New Wiki',
          info: 'This is the brand new wiki!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newWiki = res.body;
          done();
        });
    });

    it('should respond with the newly created wiki', function() {
      expect(newWiki.name).to.equal('New Wiki');
      expect(newWiki.info).to.equal('This is the brand new wiki!!!');
    });

  });

  describe('GET /api/wikis/:id', function() {
    var wiki;

    beforeEach(function(done) {
      request(app)
        .get('/api/wikis/' + newWiki._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          wiki = res.body;
          done();
        });
    });

    afterEach(function() {
      wiki = {};
    });

    it('should respond with the requested wiki', function() {
      expect(wiki.name).to.equal('New Wiki');
      expect(wiki.info).to.equal('This is the brand new wiki!!!');
    });

  });

  describe('PUT /api/wikis/:id', function() {
    var updatedWiki;

    beforeEach(function(done) {
      request(app)
        .put('/api/wikis/' + newWiki._id)
        .send({
          name: 'Updated Wiki',
          info: 'This is the updated wiki!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedWiki = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedWiki = {};
    });

    it('should respond with the updated wiki', function() {
      expect(updatedWiki.name).to.equal('Updated Wiki');
      expect(updatedWiki.info).to.equal('This is the updated wiki!!!');
    });

  });

  describe('DELETE /api/wikis/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/wikis/' + newWiki._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when wiki does not exist', function(done) {
      request(app)
        .delete('/api/wikis/' + newWiki._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
