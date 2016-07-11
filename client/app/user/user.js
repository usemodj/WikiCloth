'use strict';

angular.module('wikiClothApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        parent: 'site',
        abstract: true,
        url: '/user',
        template: '<div ui-view></div>'
      })
      .state('user.list', {
        url: '',
        template: '<user></user>',
        authenticate: 'admin'
      });
  });
