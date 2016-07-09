'use strict';

angular.module('wikiClothApp.auth', ['wikiClothApp.constants', 'wikiClothApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
