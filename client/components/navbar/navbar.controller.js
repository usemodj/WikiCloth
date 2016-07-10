'use strict';

class NavbarController {
  //end-non-standard

  //start-non-standard
  constructor(Auth, $scope) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    this.isCollapsed = true;
    $scope.$watch('nav.isCollapsed', (newValue, oldValue) => {
      if(!newValue){
        $('#navbar-main *').click(() => {
          this.isCollapsed = true;
          $('#navbar-main').collapse('hide');
        });
      }
    }, true);
  }

}

angular.module('wikiClothApp')
  .controller('NavbarController', NavbarController);
