'use strict';

// Production specific configuration
// =================================
module.exports = {
  //Server Mail
  domain: process.env.DOMAIN || undefined,
  postmailer: process.env.POST_MAILER || undefined,
  dataServiceKey: process.env.DATA_SERVICE_KEY || undefined,

  // Server IP
  ip:     process.env.OPENSHIFT_NODEJS_IP ||
          process.env.IP ||
          undefined,

  // Server port
  port:   process.env.OPENSHIFT_NODEJS_PORT ||
          process.env.PORT ||
          8080,

  // MongoDB connection options
  mongo: {
    uri:  process.env.MONGODB_URI ||
          process.env.MONGOHQ_URL ||
          process.env.OPENSHIFT_MONGODB_DB_URL +
          process.env.OPENSHIFT_APP_NAME ||
          'mongodb://localhost/wikicloth'
  }
};
