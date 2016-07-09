/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/comments              ->  index
 * POST    /api/comments              ->  create
 * GET     /api/comments/:id          ->  show
 * PUT     /api/comments/:id          ->  update
 * DELETE  /api/comments/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import async from 'async';
import path from 'path';
import fs from 'fs';
import mv from 'mv';
import Comment from './comment.model';
import config from '../../config/environment';

var uploadPath = config.uploadPath;

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
    return updated.save()
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

// Gets a list of Comments
export function index(req, res) {
  return Comment.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Comment from the DB
export function show(req, res) {
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Comment in the DB
export function create(req, res) {
  //return Comment.create(req.body)
  //  .then(respondWithResult(res, 201))
  //  .catch(handleError(res));

  console.log('>>req.body: ', req.body);

  var files = (req.files.file)? req.files.file: [];
  var comment = req.body.comment;
  comment.author = {
    object: req.user._id,
    email: req.user.email,
    name: req.user.name
  };

  return Comment.create(comment)
  .then(comment => {
      if(!Array.isArray(files)){
        files = (files)? [files]: [];
      }
      console.log('>> test ....1')
      var today = new Date();
      async.each(files, (file, callback) => {
        var uri = path.join('wiki',''+today.getFullYear(), ''+today.getMonth(),
          ''+today.getDate(), today.getSeconds() + path.basename(file.path));
        var destPath = uploadPath + uri;
        console.log('>>destPath: ', destPath);
        mv( file.path, destPath, {mkdirp: true}, (err) => {
          if(err){
            console.error(err);
          }else {
            var meta = {
              name: file.name,
              ctype: file.type,
              size: `${file.size}`,
              uri: uri
            };

            comment.files.push(meta);
          }
          callback();
        });
      }, err => {
        //all done
        comment.save()
        .then(blog => {
          return res.status(201).json(comment);
        });
      });
    })
    .catch(handleError(res));
}

// Updates an existing Comment in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Comment from the DB
export function destroy(req, res) {
  return Comment.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

// Gets a list of Comments of a Wiki
export function talk(req, res) {
  var wiki = req.params.wiki;
  return Comment.find({wiki: wiki}).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}
