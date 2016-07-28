'use strict';

(function(){

  class WikiComponent {
    constructor(Auth, Wiki, $scope, $state, $stateParams, socket, $timeout) {
      this.isLoggedIn = Auth.isLoggedIn;
      this.Wiki = Wiki;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.socket = socket;
      this.$timeout = $timeout;
      this.wiki = {name: ''};
      // Synchronous highlighting with highlight.js
      marked.setOptions({
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        }
      });
    }

    $onInit() {
      this.wiki.name = this.$stateParams.name || 'Home';

      this.Wiki.get({name: this.wiki.name}).$promise
        .then(response => {
          //console.log('>>response: ', response);
          this.wiki = response;
          this.wiki.content = marked(this.wiki.content);
        })
        .catch(e => {
          //if(this.isLoggedIn()) {
          //  this.$state.go('wiki.edit', {name: this.wiki.name}, {reload: true});
          //}
        });
    }

  }

  angular.module('wikiClothApp')
  .component('wiki', {
    templateUrl: 'app/wiki/wiki.html',
    controller: WikiComponent
  });

  class EditWikiComponent {
    constructor(Wiki, $scope, $state, $stateParams, socket) {
      this.Wiki = Wiki;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.socket = socket;
      this.$scope.initialHeight = '50em';
      this.wiki = {
        name: 'Home',
        content: '',
        active: true
     };
    }

    $onInit() {
      this.wiki.name = this.$stateParams.name || 'Home';

      this.Wiki.get({name: this.wiki.name}).$promise
        .then(response => {
          //console.log(response);
          this.wiki = response;
        });
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
    .component('editWiki', {
      templateUrl: 'app/wiki/wiki.edit.html',
      controller: EditWikiComponent
    });

  class HistoryWikiComponent {
    constructor(Wiki, $uibModal, $scope, $state, $stateParams, $location, $window, socket) {
      this.Wiki = Wiki;
      this.$uibModal = $uibModal;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$location = $location;
      this.$window = $window;
      this.socket = socket;
      this.revisions = [];
      this.revision = {};
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

      this.$scope.url = `/api/wikis/${this.$stateParams.name}/revisions`;

      this.$scope.$on('pagination:loadPage', function (event, status, config) {
        // config contains parameters of the page request
        //console.log(config.url);
        // status is the HTTP status of the result
        //console.log(status);
        self.socket.syncUpdates('wiki', self.revisions);
      });
    }

    diff(form){
      var self = this;
      if(!self.revision.old || !self.revision.new) return;
      var diffLines = JsDiff.diffLines(self.revision.old.content, self.revision.new.content, {newlineIsToken: true});
      var modalInstance = this.$uibModal.open({
        templateUrl: 'app/wiki/wiki.diff.html',
        controller: DiffWikiComponent,
        controllerAs: '$ctrl',
        windowClass: 'modal-lg',
        size: 'lg',
        resolve: {
          diff: function(){
            return diffLines;
          }
        }
      });
      modalInstance.result.then((edited) => {

      });
    }

    hideRadio(rev){
      var list = $( "input[name=new]:radio" );
      var idx = list.index($('#'+rev));
      list.slice(0, idx).css("display", "block");
      list.slice(idx).css("display", "none");
    }
  }

  angular.module('wikiClothApp')
    .component('historyWiki', {
      templateUrl: 'app/wiki/wiki.history.html',
      controller: HistoryWikiComponent
    });

  class DiffWikiComponent {
    constructor($uibModalInstance, diff, $scope, $state, $stateParams, $window) {
      this.$uibModalInstance = $uibModalInstance;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$window = $window;
      this.diff = diff;
      this.html = '';

      this.$onInit();
    }


    $onInit() {
      var diff = this.diff;
      var fragment = this.$window.document.createDocumentFragment();
      for (var i=0; i < diff.length; i++) {

        if (diff[i].added && diff[i + 1] && diff[i + 1].removed) {
          var swap = diff[i];
          diff[i] = diff[i + 1];
          diff[i + 1] = swap;
        }

        var node;
        if (diff[i].removed) {
          node = this.$window.document.createElement('del');
          node.appendChild(this.$window.document.createTextNode(diff[i].value));
        } else if (diff[i].added) {
          node = this.$window.document.createElement('ins');
          node.appendChild(this.$window.document.createTextNode(diff[i].value));
        } else {
          node = this.$window.document.createTextNode(diff[i].value);
        }
        fragment.appendChild(node);
      }

      this.html = $('<div>').append(fragment).html();
    }

    close(){
      this.$uibModalInstance.dismiss('cancel');
    }
  }

  angular.module('wikiClothApp')
    .component('diffWiki', {
      templateUrl: 'app/wiki/wiki.diff.html',
      controller: DiffWikiComponent
    });

})();

