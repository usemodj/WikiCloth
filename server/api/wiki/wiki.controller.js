/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wikis              ->  index
 * POST    /api/wikis/:name              ->  create
 * GET     /api/wikis/:name          ->  show
 * PUT     /api/wikis/:name          ->  update
 * DELETE  /api/wikis/:name          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Wiki from './wiki.model';
import paginate from 'node-paginate-anything';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {

    var updated = _.merge(entity, updates);
    //updated.revision += 1;
    updated = new Wiki(updated);
    updated._id = undefined;
    //delete updated._id;
    console.log('>>updated:', updated);
    return Wiki.create(updated)
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Wikis
export function index(req, res) {
  var clientLimit = req.query.clientLimit;
  Wiki.count().exec()
    .then(count => {
      if(count === 0){
        return [];
      }
      var totalItems = count;
      var maxRangeSize = clientLimit;
      var queryParams = paginate(req, res, totalItems, maxRangeSize);

      return Wiki.aggregate()
        .sort({created_at: -1, revision:-1})
        .group({
          "_id": {"name": "$name"},
          "info": {"$first": "$info"},
          "active": {"$first": "$active"},
          "revision": {"$max": "$revision"},
          "created_at": {"$max": "$created_at"}
        })
        .project({
          "_id": 1,
          "name": "$_id.name",
          "info": 1,
          "active": 1,
          "revision": 1,
          "created_at": 1
        })
        .limit(queryParams.limit)
        .skip(queryParams.skip)
        .exec();
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Wiki from the DB
export function show(req, res) {
  //console.log('>>req.params: ', req.params);
  var q = {
    name: req.params.name
  };
  return Wiki.find(q)
    .sort('-revision')
    .limit(1).exec()
    .spread(entity => { return entity;})
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Wiki in the DB
export function create(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  if(req.body.revision){
    req.body.revision += 1;
  } else {
    req.body.revision = 1;
  }
  req.body.created_at = new Date();
  req.body.author = {
    object: req.user._id,
    email: req.user.email,
    name: req.user.name
  };
  return Wiki.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Wiki in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  req.body.author = {
    object: req.user._id,
    email: req.user.email,
    name: req.user.name
  };

  return Wiki.find({name: req.params.name})
    .sort('-revision')
    .limit(1).exec()
    .spread(entity => {return entity;})
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Wiki from the DB
export function destroy(req, res) {
  return Wiki.find({name: req.params.name})
    .sort('-revision')
    .limit(1).exec()
    .spread(entity => {return entity;})
    .then(handleEntityNotFound(res))
    .then(entity => {
      entity.active = false;
      entity.author = {
        object: req.user._id,
        email: req.user.email,
        name: req.user.name
      };
      entity.save()
      .then(() => {
          res.status(204).end();
        });
    })
    .catch(handleError(res));
}

// Gets the revisions of a Wiki
export function revisions(req, res) {
  var clientLimit = req.query.clientLimit;
  var query = {name: req.params.name};
  Wiki.count(query).exec()
  .then(count => {
      if(count === 0){
        return [];
      }
      var totalItems = count;
      var maxRangeSize = clientLimit;
      var queryParams = paginate(req, res, totalItems, maxRangeSize);
      return Wiki.find(query)
        .sort('-revision')
        .limit(queryParams.limit)
        .skip(queryParams.skip)
        .exec();
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}
