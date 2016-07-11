'use strict';

(function(){

class UserComponent {
  constructor(User, $state, $stateParams, $scope, $location, $window, $uibModal, socket, appConfig) {
    this.errors = {};
    this.success = '';
    this.submitted = false;
    this.User = User;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$scope = $scope;
    this.$location = $location;
    this.$window = $window;
    this.$uibModal = $uibModal;
    this.socket = socket;
    this.appConfig = appConfig;
    this.clientLimit = 250;
    this.users = [];
    this.conditions = {};

  }

  $onInit(timestamp){
    var self = this;
    self.submitted = true;
    self.q = self.$stateParams.q;
    self.perPage = parseInt(self.$location.search().perPage, 10) || 10;
    self.page = parseInt(self.$location.search().page, 10) || 0;

    self.$scope.$watch('page', function(page) { self.$location.search('page', page); });
    self.$scope.$watch('perPage', function(page) { self.$location.search('perPage', page); });
    self.$scope.$on('$locationChangeSuccess', function() {
      var page = +self.$location.search().page,
        perPage = +self.$location.search().perPage;
      if(page >= 0) { self.page = page; }
      if(perPage >= 0) { self.perPage = perPage; }
    });

    self.urlParams = self.conditions;
    self.urlParams.clientLimit = self.clientLimit;

    self.url = `/api/users?ts=${timestamp || new Date().getTime()}`;

    self.$scope.$on('$destroy', function() {
      self.socket.unsyncUpdates('user');
    });

    self.$scope.$on('pagination:loadPage', function (event, status, config) {
      // config contains parameters of the page request
      //console.log(config.url);
      // status is the HTTP status of the result
      //console.log(status);
      self.socket.syncUpdates('user', self.users);
    });

  }

  search(form){
    this.$onInit(new Date().getTime());
  }

  edit(user){
    this.submitted = true;
    var modalInstance = this.$uibModal.open({
      templateUrl: 'app/user/user.edit.html',
      controller: EditUserComponent,
      controllerAs: '$ctrl',
      resolve: {
        user: function(){
          return angular.copy(user);
        }
      }
    });
    modalInstance.result.then((editedUser) => {
      this.User.update(editedUser).$promise
      .then(response => {
          user.role = editedUser.role;
          user.active = editedUser.active;
        });
    }, () => {
      //dismiss
    })
    .catch(err => {
      console.log(err);
    });
  }

}

angular.module('wikiClothApp')
  .component('user', {
    templateUrl: 'app/user/user.html',
    controller: UserComponent,
    controllerAs: '$ctrl'
  });

class EditUserComponent {
  constructor($uibModalInstance, $scope, $state, $stateParams, $window, appConfig, user) {
    this.$uibModalInstance = $uibModalInstance;
    this.$scope = $scope;
    this.$state = $state;
    this.$stateParams = $stateParams;
    this.$window = $window;
    this.appConfig = appConfig;
    this.user = user;

    this.$onInit();
  }


  $onInit() {

  }

  save(form){
    if(form.$valid){
      this.$uibModalInstance.close(this.user);
    }
  }

  cancel(){
    this.$uibModalInstance.dismiss('cancel');
  }
}

angular.module('wikiClothApp')
  .component('editUser', {
    templateUrl: 'app/user/user.edit.html',
    controller: EditUserComponent
  });

})();
