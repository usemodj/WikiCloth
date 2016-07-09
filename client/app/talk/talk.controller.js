'use strict';

(function(){

  class TalkComponent {
    constructor(Auth, Talk, Upload, $http, $uibModal, $state, $stateParams, $scope, socket) {
      this.isLoggedIn = Auth.isLoggedIn;
      this.errors = {};
      this.success = '';
      this.submitted = false;
      this.Auth = Auth;
      this.Talk = Talk;
      this.Upload = Upload;
      this.$http = $http;
      this.$uibModal = $uibModal;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$scope = $scope;
      this.socket = socket;
      this.comments = [];
      this.comment = {};
      this.files = [];

      this.progress = 0;
      // Synchronous highlighting with highlight.js
      marked.setOptions({
        highlight: function (code) {
          return hljs.highlightAuto(code).value;
        }
      });

      $scope.$on('fileSelected', (event, args) => {
        //console.log(args.file);
        $scope.$apply(() => this.files.push(args.file));
      });

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('comment');
      });

    }

    $onInit(){
      this.$http.get(`/api/comments/${this.$stateParams.name}/talk`)
      .then(response => {
          console.log(response);
          this.comments = response.data;
          this.socket.syncUpdates('comment', this.comments);
        });
    }

    talk(form){
      this.submitted = true;
      this.progress = 0;
      this.comment.wiki = this.$stateParams.name;
      this.comment.html = marked(this.comment.content || '');
      //this.Talk.save(this.comment).$promise
      //.then(response => {
      //    //this.$state.go('talk.list',{name: this.comment.wiki}, {reload: true});
      //  });
      if(form.$valid) {
        this.Upload.upload({
          url: '/api/comments',
          method: 'POST',
          fields: {comment: this.comment},
          file: (this.files !== null) ? this.files : null,
          fileFormatDataName: 'file'
        })
        .progress((evt) => {
          this.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        })
        .success((data, status, headers, config) => {
            //this.$state.go('talk.list',{name: this.comment.wiki}, {reload: true});
        })
        .error((data, status, headers, config) => {
          this.errors.other = data;
        });
      }
    }
  }

  angular.module('wikiClothApp')
    .component('talk', {
      templateUrl: 'app/talk/talk.html',
      controller: TalkComponent
    });

})();
