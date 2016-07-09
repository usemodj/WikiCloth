/**
 * Wiki model events
 */

'use strict';

import {EventEmitter} from 'events';
import Wiki from './wiki.model';
var WikiEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
WikiEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Wiki.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    WikiEvents.emit(event + ':' + doc._id, doc);
    WikiEvents.emit(event, doc);
  }
}

export default WikiEvents;
