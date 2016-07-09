'use strict';

angular.module('wikiClothApp', ['wikiClothApp.auth', 'wikiClothApp.admin', 'wikiClothApp.constants',
    'ngCookies', 'ngResource', 'ngSanitize', 'btford.socket-io', 'ui.router', 'ui.bootstrap',
    'validation.match', 'relativeDate', 'hljs', 'bgf.paginateAnything', 'ngFileUpload'
  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(['$stateProvider', function($stateProvider) {
    $stateProvider
      .state('site', {
        abstract: true,
        url: '',
        templateUrl: 'app/layout.html'
      });
  }])
  .run(['$rootScope', '$state', '$stateParams', 'Auth', function($rootScope, $state, $stateParams, Auth){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.Auth = Auth;

    $rootScope.$on('$stateChangeError',
      function (event, toState, toParams, fromState, fromParams, error) {
        console.log('$stateChangeError', event, toState, toParams, fromState, fromParams, error);
      });
  }])
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

  }])
  .run(['$rootScope', '$state', '$injector','Auth', function ($rootScope, $state, $injector, Auth) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      var redirect = toState.redirectTo;
      if (redirect) {
        if (angular.isString(redirect)) {
          event.preventDefault();
          $state.go(redirect, toParams);
        }
        else {
          var newState = $injector.invoke(redirect, null, {toState: toState, toParams: toParams});
          if (newState) {
            if (angular.isString(newState)) {
              event.preventDefault();
              $state.go(newState);
            }
            else if (newState.state) {
              event.preventDefault();
              $state.go(newState.state, newState.params);
            }
          }
        }
      }
      if(toState.name === 'login'){
        $state.previousState = fromState;
        $state.previousParams = fromParams;
      }

      var requiresLogin = toState.authenticate;
      if(requiresLogin){
        return Auth.isLoggedIn( is => {
          if(!is){
            event.preventDefault();
            return $state.go('login');
          }
        });
      }

    });
  }]);
