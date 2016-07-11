# wiki-cloth

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.7.6.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Ruby](https://www.ruby-lang.org) and then `gem install sass`
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & production
Change `start.sample.sh` to `start.sh` and  modify it.

Run `gulp build` for building, `mkdir dist/client/assets/upload` for making directory and `sh dist/start.sh` for production mode.

## Testing

Running `npm test` will run the unit tests with karma.


## issue solution

Running `sudo npm rebuild node-sass`

> no such file or directory, scandir 'node_modules/node-sass/vendor'

Running `sudo npm rebuild optipng`

> 'node_modules/optipng-bin/vendor/optipng' ENOENT
