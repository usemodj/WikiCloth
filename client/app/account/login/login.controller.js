'use strict';

class LoginController {
  constructor(Auth, $state, $window) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
    this.$window = $window;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          if(this.$state.previousState && this.$state.previousState.name) {
            this.$state.go(this.$state.previousState.name, this.$state.previousParams);
          }else {
            // Logged in, redirect to home
            this.$state.go('main');
          }
        })
        .catch(err => {
          var msg = err.message || err.data || err;
          this.errors.other = `${msg} ${err.provider}`;
          if(err.provider){
            this.$window.location.href = '/auth/' + err.provider;
          }
        });
    }
  }
}

angular.module('wikiClothApp')
  .controller('LoginController', LoginController);
