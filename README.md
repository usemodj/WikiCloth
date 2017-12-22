# WikiCloth
WikiCloth is a Wiki engine to create and edit a web page. It uses the Markdown syntax for plain text and the MathJax LaTeX syntax for the mathematical symbols.

As it operates as a web server, you can view the web pages created by any web browser, and edit a web page while logged in.

You can receive comments on each web page, then upload the files you can see the uploaded files in a Web page.

Each web page can compare the edited contents having changed history.

_This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.6._

## Getting Started

### Prerequisites
- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org): Node v9.3 (prefer `yarn` to `npm`)
- [Bower](bower.io)
  (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/)
  (`npm install --global gulp` , or `yarn global add gulp` if `yarn` installed)
- [MongoDB](https://www.mongodb.org/) : Keep a running daemon with `mongod`

>#### How to install the prerequisites:
>> [/doc/how-to-install-prerequisites.md](/doc/how-to-install-prerequisites.md)

### Developing

1. Run `npm install`(or, `yarn install`) to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve`(or, `npm start`, `yarn start`) to start the development server. It should automatically open the client in your browser when ready.

> For updating `webdriver` for `protractor`,
```
$ yarn update-webdriver
# Or,
$ npm update-webdriver
```

> For running `gulp serve`:
```
$ yarn serve
# Or,
$ npm serve
```

> For running `gulp test`:
```
$ yarn test
# Or,
$ npm test
```


## Build & production
Change `start.sample.sh` to `start.sh` and  modify it.

Run `gulp build` for building, `mkdir dist/client/assets/upload`
for making `upload` directory and `sh start.sh` for production mode.

#### Run production mode
```
# For building into `dist/` directory:
$ gulp build
                                                                                                                                                                                                                                                                                                                    
# Go to `WikiCloth/dist/` directory and run `production` mode:
$ cd dist/

# To run `npm start` in `production` mode:
WikiCloth/dist$ NODE_ENV=production GOOGLE_ID=[id] GOOGLE_SECRET=[secret]  npm start
```

>### To run the server on `production mode` using ___PM2___ process manager
> Copy the `start.sample.sh` bash file to `start.sh`,
> modify the parameters, change the file mode to execute (`chmod a+x start.sh`)
> and then, run the shell script `start.sh`.
>
>> _(prefer `PM2` process manager to others)_
>>
>> [PM2](http://pm2.keymetrics.io/) - Advanced, production process manager for Node.js
>>```
>># Install `PM2` globally:
>>$ yarn global add pm2
>>
>># Or, use this command:
>>$ sudo npm install -g pm2
>>
>>$ pm2 --help
>>```


## Testing
Running `npm test` will run the unit tests with karma.


## issue solution

Running `sudo npm rebuild node-sass`

> no such file or directory, scandir 'node_modules/node-sass/vendor'

Running `sudo npm rebuild optipng`

> 'node_modules/optipng-bin/vendor/optipng' ENOENT


## Oauth login _for people who already have social site accounts_
- Login with `Facebook`: <https://developers.facebook.com/docs/facebook-login>
> facebook callbackURL: `"{DOMAIN}:{PORT}/auth/facebook/callback"`

- Login with `Twitter`: <https://apps.twitter.com>
> twitter callbackURL: `"{DOMAIN}:{PORT}/auth/twitter/callback"`

- Login with `Google`: <https://console.developers.google.com>
 > google callbackURL: `"{DOMAIN}:{PORT}/auth/google/callback"`

Example for `google` console page:
> DOMAIN=`'http://localhost'`
> PORT=`9000`
>
> google callbackURL: '`http://localhost`:`9000`/auth/google/callback'
 
_`Those did not be saved to the configuration file("server/config/local.env.js", See "local.env.sample.js")
for security reasons.`_
