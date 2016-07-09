'use strict';

var express = require('express');
var controller = require('./comment.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('user'), controller.create);
router.put('/:id', auth.hasRole('user'), controller.update);
router.patch('/:id', auth.hasRole('user'), controller.update);
router.delete('/:id', auth.hasRole('user'), controller.destroy);

router.get('/:wiki/talk', controller.talk);
router.post('/:id/removeFile', auth.isAuthenticated(), controller.removeFile);

module.exports = router;
