# How to install the prerequisites for `WikiCloth`

## Prerequisites
- [Git](https://git-scm.com/)

- [Node.js and npm](nodejs.org): Node v9.3 (prefer `yarn` to `npm`)

- [Bower](http://bower.io):
  (`npm install --global bower`)

- [Ruby](https://www.ruby-lang.org) and then `sudo apt-get install ruby-sass` (ubuntu) or `gem install sass`

- [Gulp](http://gulpjs.com/)
  (`npm install --global gulp` , or `yarn global add gulp` if `yarn` installed)

- [MongoDB](https://www.mongodb.org/) : Keep a running daemon with `mongod`

- [Elasticsearch](https://www.elastic.co/downloads/elasticsearch) - Full text search engine for MongoDB:
  Elasticsearch `v6.x` requires `Java 8 or later`.
  
  
## How to install the `prerequisites`


1. [Git](https://git-scm.com/): default installed on Ubuntu Linux
```
$ git --version
git version 2.7.4

$ git --help
```

2. [Node.js](http://nodejs.org) Node v9.x :
> [Installing Node.js via package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions),
>```
> # for Node.js v9.x:
> $ curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
> $ sudo apt-get install -y nodejs
>
> # Alternatively, for Node.js 8:
> $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
> $ sudo apt-get install -y nodejs
>```
> Note: `Ubuntu 17.04` comes with `cmdtest` installed by default.
> If you’re getting errors from installing `yarn`,
> you may want to run `sudo apt remove cmdtest` first.
> Refer to [this](https://github.com/yarnpkg/yarn/issues/2821) for more information.

3. [Yarn](https://yarnpkg.com/en/docs/install) is a package manager for your code.
> It allows you to use and share code with other developers from around the world.
>```
> # On Debian or Ubuntu Linux,
> # configure the repository:
> $ curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
> $ echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
>
> # On `Ubuntu 16.04` or below and Debian Stable,
> # you will also need to configure the
> # [NodeSource repository](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
> # to get a new enough version of `Node.js`.
>
> # Then you can simply:
> $ sudo apt-get update && sudo apt-get install yarn
>
> # Test that Yarn is installed by running:
> $ yarn --version
>```
>
>
> **Path Setup :**
>
> To have access to Yarn’s executables globally,
> you will need to set up the `PATH` environment variable in your terminal.
> To do this, add ```export PATH="$PATH:`yarn global bin`"``` to your profile.
>
> Note: your profile may be in your `.profile`, `.bash_profile`, `.bashrc`, `.zshrc`, etc.
>```
> #$ `nano ~/.profile` to edit `.profile` file:
> export PATH="$PATH:`yarn global bin`"
>```
> Then, for the changes to take effect:
>```
>$ source ~/.Profile
>```

4. [Bower](bower.io) (`yarn global add bower`)

5. [Ruby](https://www.ruby-lang.org) and then `sudo apt-get install ruby-sass` (ubuntu) or `gem install sass`
>```
> # Installing `Ruby`(2.4.2) using `rbenv`(Ruby Version Manager):
> # (First you install rbenv, and then ruby-build)
> $ cd
> $ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
> $ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
> $ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
> $ exec $SHELL
>
> $ git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
> $ echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
> $ exec $SHELL
>
> $ rbenv install 2.4.2
> $ rbenv global 2.4.2
> $ ruby -v
>
> # The last step is to install `Bundler`.
> # Bundler: The best way to manage a Ruby application's gems.
> # `rbenv` users need to run `rbenv rehash` after installing `bundler`:
> $ gem install bundler
> $ rbenv rehash
>
> # Install `ruby-sass` package:
> $ sudo apt-get install ruby-sass
>```
>> Use **[rbenv](https://github.com/rbenv/rbenv#readme)** to pick a Ruby version for your application and guarantee
>> that your development environment matches production.
>> Put `rbenv` to work with **[Bundler](http://bundler.io/)** for painless Ruby upgrades and bulletproof deployments.
>>

6. [Gulp](http://gulpjs.com/)
  (`npm install --global gulp` , or `yarn global add gulp` if `yarn` installed)
>```
> $ yarn global add gulp
>```

7. [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`
> **[Install MongoDB Enterprise on Ubuntu 16.04](https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-ubuntu/?_ga=1.215636823.131396676.1491531928) :**
>
> `MongoDB` only provides packages for `64-bit` LTS (long-term support) Ubuntu releases. For example, 12.04 LTS (precise), 14.04 LTS (trusty), 16.04 LTS (xenial), and so on. These packages may work with other Ubuntu releases, however, they are not supported.
>
> 1. Import the public key used by the package management system:
>```
> $ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
>```
>
> 2. Create a `/etc/apt/sources.list.d/mongodb-enterprise.list` file for MongoDB.
> Ubuntu 16.04:
>```
> $ echo "deb [ arch=amd64,arm64,ppc64el,s390x ] http://repo.mongodb.com/apt/ubuntu xenial/mongodb-enterprise/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
>```
>
> 3. Reload local package database:
>```
> $ sudo apt-get update
>```
>
> 4. Install the MongoDB Enterprise packages:
>```
> # Install the latest stable version of MongoDB Enterprise:
> $ sudo apt-get install -y mongodb-enterprise
>```
>
> **Run MongoDB Enterprise :**
>
> The MongoDB instance stores its data files in `/var/lib/mongodb` and its log files in `/var/log/mongodb` by default, and runs using the mongodb user account. You can specify alternate log and data file directories in `/etc/mongod.conf`.
>
> If you change the user that runs the MongoDB process,
> you must modify the access control rights to the `/var/lib/mongodb` and `/var/log/mongodb` directories
> to give this user access to these directories.
>
> 1. Start MongoDB: [Elasticsearch](https://www.elastic.co/downloads/elasticsearch) - Full text search engine :
  Elasticsearch requires `Java 8 or later`.
>```
> $ sudo service mongod start
>```
>
> 2. Verify that MongoDB has started successfully
> by checking the contents of the log file:
>```
> $ sudo vim /var/log/mongodb/mongod.log
> $
> [initandlisten] waiting for connections on port [port]
> where <port> is the port configured in `/etc/mongod.conf`, 27017 by default.
>```
>
> 3. Stop MongoDB:
> ```
> $ sudo service mongod stop
> ```
>
> 4. Restart MongoDB:
> ```
> $ sudo service mongod restart
> ```
>
> 5. Begin using MongoDB:
>  See [Getting Started](https://docs.mongodb.com/manual/#getting-started) for the available editions.
>

8. [Elasticsearch](https://www.elastic.co/downloads/elasticsearch) - Full text search engine :
  Elasticsearch `v6.x` requires `Java 8 or later`.
>#### [How To Install Java with Apt-Get on Ubuntu 16.04](https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04)
>
> **1. Installing the Oracle JDK:**
>
> First, add Oracle's PPA, then update your package repository:
>```
> $ sudo add-apt-repository ppa:webupd8team/java
> $ sudo apt-get update
>```
>
> Then, Oracle `JDK 9`:
>```
> $ sudo apt-get install oracle-java9-installer
>```
>
> or, Oracle `JDK 8`:
>```
> $ sudo apt-get install oracle-java8-installer
>```
>
> **2. Managing Java :**
>
> There can be multiple Java installations on one server.
> You can configure which version is the default for use in the command line
> by using `update-alternatives`:
>```
> $ sudo update-alternatives --config java
>
> # This can also be done for other Java commands,
> # such as the compiler(javac), the documentation generator(javadoc),
> # the JAR signing tool(jarsigner), and more:
> #$ sudo update-alternatives --config javac
> #$ sudo update-alternatives --config javadoc
> #$ sudo update-alternatives --config jarsigner
>```
>
> **3. Setting the `JAVA_HOME` Environment Variable :**
>
> Many programs, such as Java servers, use the `JAVA_HOME` environment variable to determine the Java installation location.
>```
> # To find out where Java is installed:
> $ sudo update-alternatives --config java
>
> # Copy the path from your preferred installation
> # and then open `/etc/environment` using `nano` editor:
> $
> $ sudo nano /etc/environment
>   ...
> # At the end of this file, add the following line,
> JAVA_HOME="/usr/lib/jvm/java-9-oracle"
>```
>
> Save and exit the file, and reload and test it:
> ```
> # Reload environment:
> $ source /etc/environment
>
> # View `JAVA_HOME`:
> $ echo $JAVA_HOME
> /usr/lib/jvm/java-9-oracle
> ```
>
>#### [Install Elasticsearch with Debian Package on Debian and Ubuntu](https://www.elastic.co/guide/en/elasticsearch/reference/6.0/deb.html)
>```
># Import the Elasticsearch PGP Key:
>$ -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
>
>Installing from the APT repository:
># You may need to install the apt-transport-https package on Debian before proceeding
>$ sudo apt-get install apt-transport-https
>
># Save the repository definition
>$ echo "deb https://artifacts.elastic.co/packages/6.x/apt stable main" | sudo tee -a /etc/apt/sources.list.d/elastic-6.x.list
>
># You can install the Elasticsearch Debian package with
>$ sudo apt-get update && sudo apt-get install elasticsearch
>
> Running Elasticsearch with `systemd`
>  to start automatically when the system boots up:
>$ sudo /bin/systemctl daemon-reload
>$ sudo /bin/systemctl enable elasticsearch.service
>
># Elasticsearch can be started and stopped as follows:
>$ sudo systemctl start elasticsearch.service
>$ sudo systemctl stop elasticsearch.service
>```
>
> **Checking that Elasticsearch is running:**
>```
># this information will be written in the log files located in
>$ sudo tail -f /var/log/elasticsearch/elasticsearch.log
>```
> You can test that your Elasticsearch node is running by sending an HTTP request to port `9200` on `localhost`:
>```
>$ curl -XGET 'localhost:9200/?pretty'
>
># which should give you a response something like this:
> {
>   "name" : "DGJeJk2",
>   "cluster_name" : "elasticsearch",
>   "cluster_uuid" : "p-XSaQChSPymZ6QCzb1D_g",
>   "version" : {
>     "number" : "6.0.0",
>     "build_hash" : "8f0685b",
>     "build_date" : "2017-11-10T18:41:22.859Z",
>     "build_snapshot" : false,
>     "lucene_version" : "7.0.1",
>     "minimum_wire_compatibility_version" : "5.6.0",
>     "minimum_index_compatibility_version" : "5.0.0"
>   },
>   "tagline" : "You Know, for Search"
> }
>```
>>##### [ElasticSearch Analysis Plugins](https://www.elastic.co/guide/en/elasticsearch/plugins/current/analysis.html#analysis)
>> `Analysis plugins` extend `Elasticsearch` by adding new `analyzers`, `tokenizers`, `token filters`, or `character filters`
>> to Elasticsearch.
>>
>> _For Korean Text Search,_
>> ___use the [usemodj/elasticsearch-analysis-korean](https://github.com/usemodj/elasticsearch-analysis-korean) Korean Analysis Plugin for ElasticSearch 6.x___
>>


9. [PhantomJS](http://phantomjs.org/) - a headless WebKit scriptable with a JavaScript API.
It has fast and native support for various web standards: DOM handling, CSS selector, JSON, Canvas, and SVG.
>
>#### [How to Install `PhantomJS` on Ubuntu 16.04](https://www.vultr.com/docs/how-to-install-phantomjs-on-ubuntu-16-04)
>   Before installing PhantomJS, you will need to install some required packages on your system.
> You can install all of them with the following command:
>```
> $ sudo apt-get update -y
> $ sudo apt-get upgrade -y
> $ sudo apt-get install build-essential chrpath libssl-dev libxft-dev libfreetype6-dev libfreetype6 libfontconfig1-dev libfontconfig1 -y
>```
>
>  Next, you will need to download the `PhantomJS`:
>```
> $ sudo wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
>
> # Extract the downloaded archive file to desired system location:
> $ sudo tar xvjf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
>
> # Next, create a symlink of PhantomJS binary file to systems bin dirctory:
> $ sudo ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/
>
> # Verify PhantomJS:
> $ phantomjs --version
>```
>
