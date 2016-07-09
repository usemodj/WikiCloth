'use strict';

import mongoose from 'mongoose';

var WikiSchema = new mongoose.Schema({
  name: {type: String},
  content: String,
  html: String,
  revision: {type: Number, default:1},
  info: String,
  active: {type: Boolean, default: true},
  author: {
    object: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name: String,
    email: String
  },
  tags: {type: [String]},
  comments:[{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  created_at: {type: Date, default: Date.now()}
});
/**
 * Pre-save hook
 */
//WikiSchema.pre('save', function(next) {
//  if(!this._id){
//    this._id = new mongoose.Types.ObjectId();
//  }
//  return next();
//});

export default mongoose.model('Wiki', WikiSchema);
