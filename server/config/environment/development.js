'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/wikicloth-dev',
    debug: true
  },

  // Seed database on startup
  seedDB: true

};
