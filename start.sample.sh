#! /bin/bash
#NODE_ENV=production PORT=4300  npm start
NODE_ENV=production \
PORT=4300 \
DOMAIN='http://localhost' \
POST_MAILER='postmaster@localhost' \
MONGODB_URI='mongodb://localhost/wikicloth' \
SESSION_SECRET='wikicloth-secret' \
FACEBOOK_ID='app-id' \
FACEBOOK_SECRET='secret' \
TWITTER_ID='app-id' \
TWITTER_SECRET='secret' \
GOOGLE_ID='app-id' \
GOOGLE_SECRET='secret' \
pm2 start $(dirname "$0")/dist/server --name "wikicloth"
