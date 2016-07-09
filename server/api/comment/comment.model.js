'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  title: {type: String, required: true},
  content: String,
  html: String,
  wiki: {type: String, index: true},
  author: {
    object: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    email: String
  },
  files: [{
    name: String,
    ctype: String,
    size: String,
    uri: String
  }],
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()}
});

export default mongoose.model('Comment', CommentSchema);
