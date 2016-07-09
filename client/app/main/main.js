'use strict';

angular.module('wikiClothApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
      url: '/',
      template: '<main></main>'
    });
  });
