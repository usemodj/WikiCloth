'use strict';

var express = require('express');
var controller = require('./wiki.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:name', auth.authenticated(), controller.show);
router.post('/:name', auth.hasRole('user'), controller.create);
router.put('/:name', auth.hasRole('user'), controller.update);
router.patch('/:name', auth.hasRole('user'), controller.update);
router.delete('/:name', auth.hasRole('user'), controller.destroy);

router.get('/:name/revisions', controller.revisions);

module.exports = router;
