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
      this.$scope.initialHeight = '38em';

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
            this.comment = {};
        })
        .error((data, status, headers, config) => {
          this.errors.other = data;
        });
      }
    }

    editTalk(comment){
      this.submitted = true;
      var self = this;
      var modalInstance = this.$uibModal.open({
        templateUrl: 'app/talk/talk.edit.html',
        controller: EditTalkComponent,
        controllerAs: '$ctrl',
        windowClass: 'modal-lg',
        size: 'lg',
        resolve: {
          comment: function(){
            return angular.copy(comment);
          }
        }
      });
      modalInstance.result.then((edited) => {
        edited.html = marked(edited.content);
        comment.title = edited.title;
        comment.content = edited.content;
        comment.html = edited.html;
        comment.files = angular.copy(edited.files);
        this.saveEdited(edited);
      }, () => {//dismiss

      })
      .catch(err => {
        console.log(err);
      });
    }

    saveEdited(comment){
      delete comment.$promise;

      this.progress = 0;
      this.Upload.upload({
        url: `/api/comments/${comment._id}`,
        method: 'PUT',
        fields:{ comment: comment },
        file: (comment.files !== null)? comment.files: null,
        fileFormatDataName: 'file'
      })
        .progress((evt) => {
          this.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        })
        .success((data, status, headers, config) => {
          //this.$state.go('talk.list', {name: comment.wiki}, {reload: true});
        })
        .error((data, status, headers, config) => {
          this.errors.other = data;
        });
    }

    deleteTalk(comment){
      this.submitted = true;
      this.Talk.delete({id: comment._id}).$promise
      .catch(err => {
          this.errors.other = err.message || err.data || err;
        });
    }
  }

  angular.module('wikiClothApp')
    .component('talk', {
      templateUrl: 'app/talk/talk.html',
      controller: TalkComponent
    });

  class EditTalkComponent {
    constructor(Auth, Talk, $uibModalInstance, comment, $scope, $state, $stateParams, $window) {
      this.errors = {};
      this.success = '';
      this.isLoggedIn = Auth.isLoggedIn;
      this.Talk = Talk;
      this.$uibModalInstance = $uibModalInstance;
      this.$scope = $scope;
      this.$state = $state;
      this.$stateParams = $stateParams;
      this.$window = $window;
      this.$scope.initialHeight = '38em';

      this.comment = comment;
      this.files = [];

      $scope.$on('fileSelected', (event, args) => {
        //console.log(args.file);
        $scope.$apply(() => this.files.push(args.file));
      });

      this.$onInit();
    }


    $onInit() {

    }

    save(form){
      this.submitted = true;
      if(form.$valid) {
        this.comment.files = this.files;
        this.$uibModalInstance.close(this.comment);
      }
    }

    cancel(){
      this.$uibModalInstance.dismiss('cancel');
    }

    removeFile(file){
      var files = this.comment.files;
      if(files){
        this.Talk.removeFile({_id: this.comment._id, uri: file.uri}).$promise
          .then( () => {
            files.splice(files.indexOf(file), 1);
          })
          .catch(err => {
            this.errors.other = err.message || err;
          });
      }
    }
  }

  angular.module('wikiClothApp')
    //.controller('EditTalkComponent',EditTalkComponent);
    .component('editTalk', {
      templateUrl: 'app/talk/talk.edit.html',
      controller: EditTalkComponent
    });

})();
