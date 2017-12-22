## Install `Elastic Search Server` and `mongoosastic` search pagination

### Step 1. Download and install `Elastic Search Server`

<https://www.elastic.co/downloads/elasticsearch>

1. Download and unzip the latest `Elasticsearch` distribution

2. Run `bin/elasticsearch` on Unix
   or `sudo dpkg -i elasticsearch-xxx.deb`

3. Run `curl -X GET http://localhost:9200/`


Automatically launch `ElasticSearch` at startup:
```
$ sudo update-rc.d elasticsearch defaults
```


### Step 2. Install and set `mongoosastic` nodejs module

```
$ npm install --save mongoosastic
```

Server: `blog.model.js`:
```
var mongoosastic = require('mongoosastic');

var BlogSchema = new mongoose.Schema({
 ...
 
 });

 BlogSchema.methods = {
 ...
 };
 
// Locate `BlogSchema.plugin(mongoosastic);`
// just before `export default mongoose.model('Blog', BlogSchema);`.
BlogSchema.plugin(mongoosastic);
export default mongoose.model('Blog', BlogSchema);

```
 

### Step 3. `Mongoosastic` MongoDB Text Search Pagination

```
$ bower install --save angular-paginate-anything
$ npm install --save node-paginate-anything
```

Client: `blog.html`:
```
  <form class="form" name="form" ng-submit="vm.search(form)" novalidate>
    <div class="form-group col-lg-5 col-sm-5 pull-right">
      <input class="form-control" ng-model="vm.qsearch" placeholder="Search">
    </div>
  </form>

  <bgf-pagination page="page" per-page="perPage" client-limit="clientLimit"
    url="url" url-params="urlParams" collection="vm.blogs">
  </bgf-pagination>

```

#### Angularjs:

Client: `app.js`:
```
angular.module('myModule', [
  'bgf.paginateAnything'
]);
```

Client: `blog.js`:
```
'use strict';

angular.module('smartPlugApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('blog', {
        url: '/blog',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'vm'
      })
      .state('blogSearch', {
        url: '/blog/search/:qsearch',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'vm'
      })
      .state('blogTag', {
        url: '/blog/tag/:tag',
        templateUrl: 'app/blog/blog.html',
        controller: 'BlogCtrl',
        controllerAs: 'vm'
      });
  });
```


Client: `blog.controller.js`:
```
'use strict';

class BlogCtrl {
  constructor($state, $stateParams, $http, $scope, $location, $window, socket) {
    this.errors = {};
    this.success = '';
    this.submitted = false;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$http = $http;
    this.$scope = $scope;
    this.$window = $window;
    this.blogs = [];
    this.qsearch = '';

    $scope.perPage = parseInt($location.search().perPage, 10) || 2;
    $scope.page = parseInt($location.search().page, 10) || 0;
    $scope.clientLimit = 250;

    $scope.$watch('page', function(page) { $location.search('page', page); });
    $scope.$watch('perPage', function(page) { $location.search('perPage', page); });
    $scope.$on('$locationChangeSuccess', function() {
      var page = +$location.search().page,
        perPage = +$location.search().perPage;
      if(page >= 0) { $scope.page = page; };
      if(perPage >= 0) { $scope.perPage = perPage; };
    });

    $scope.urlParams = {
      clientLimit: $scope.clientLimit
    };

    var tag = $stateParams.tag;
    this.qsearch = $stateParams.qsearch;
    if(this.qsearch){
      $scope.url = `/api/blogs/search/${this.qsearch}`;
    }
    else if(tag){
      $scope.url = `/api/blogs/tag/${tag}`;
    } else {
      $scope.url = '/api/blogs';
    }

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('blog');
    });

    $scope.$on('pagination:loadPage', function (event, status, config) {
      socket.syncUpdates('blog', $scope.blogs);
    });
  }

  search(form){
    this.submitted = true;
    //this.$scope.url = `/api/blogs/search/${this.qsearch}`;
    this.$window.location.href = `/blog/search/${this.qsearch}`;
  }

}

angular.module('myModule')
  .controller('BlogCtrl', BlogCtrl);
```


Server: `blog.controller.js`:
```
export function search(req, res, next){
  var clientLimit = req.query.clientLimit;
  var terms = req.params.terms;
  try {
    Blog.search({query_string: {query: terms}}, {size: 0, hydrate: false}, (err, results) => {
      if (err) {
        console.error(err);
        throw err;
      }
      if(results.hits.total == 0){
        return res.status(200).send();
      }
      var totalItems = results.hits.total;
      var maxRangeSize = clientLimit;
      var queryParams = paginate(req, res, totalItems, maxRangeSize);
      Blog.search({query_string: {query: terms}}, {
        from: queryParams.skip,
        size: queryParams.limit,
        sort: 'created_at:desc',
        hydrate: true
      }, (err, results) => {
        if (err) {
          console.error(err);
          throw err;
        }
        var blogs = [];
        results.hits.hits.forEach((hit) => {
          blogs.push(hit);
        });

        res.status(200).json(blogs);
      });
    });
  } catch(err) {
    console.error(err);
    res.status(500).json(err.message || err);
  }
}
```
  
