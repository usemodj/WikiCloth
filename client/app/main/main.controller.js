'use strict';

(function() {

  class MainController {

    constructor(Auth, Wiki, $scope, $state, $location, $window, socket) {
      this.isLoggedIn = Auth.isLoggedIn;
      this.Wiki = Wiki;
      this.$scope = $scope;
      this.$state = $state;
      this.$location = $location;
      this.$window = $window;
      this.socket = socket;
      this.wikis = [];
      this.$scope.initialHeight = '25em';
      this.wiki = {
        name: '',
        content: ''
      };

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('wiki');
      });
    }

    $onInit() {
      var self = this;
      this.$scope.perPage = parseInt(this.$location.search().perPage, 10) || 10;
      this.$scope.page = parseInt(this.$location.search().page, 10) || 0;
      this.$scope.clientLimit = 250;

      this.$scope.$watch('page', function(page) { self.$location.search('page', page); });
      this.$scope.$watch('perPage', function(page) { self.$location.search('perPage', page); });
      this.$scope.$on('$locationChangeSuccess', function() {
        var page = +self.$location.search().page,
          perPage = +self.$location.search().perPage;
        if(page >= 0) { self.$scope.page = page; }
        if(perPage >= 0) { self.$scope.perPage = perPage; }
      });

      this.$scope.urlParams = {
        clientLimit: this.$scope.clientLimit
      };

      this.$scope.url = `/api/wikis`;

      this.$scope.$on('pagination:loadPage', function (event, status, config) {
        // config contains parameters of the page request
        //console.log(config.url);
        // status is the HTTP status of the result
        //console.log(status);
        self.socket.syncUpdates('wiki', self.wikis);
      });
    }

    close(wiki){
      this.wikis.splice(this.wikis.indexOf(wiki), 1);
    }
    save(form){
      if(this.wiki.content){
        this.Wiki.save(this.wiki).$promise
          .then(response => {
            this.$state.go('wiki.view', {name: this.wiki.name});
          });
      }
    }
  }

  angular.module('wikiClothApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
