'use strict';

angular.module('wikiClothApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('talk', {
        parent: 'site',
        abstract: true,
        url: '/talk',
        template: '<div ui-view></div>'
      })
      .state('talk.list', {
        url: '/:name',
        template: '<talk></talk>'
      });
  });
