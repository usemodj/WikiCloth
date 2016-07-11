'use strict';

angular.module('wikiClothApp')
  .config(function($stateProvider) {
    $stateProvider
      //.state('main', {
      //  parent: 'site',
      //  abstract: true,
      //  url: '/',
      //  template: '<div ui-view></div>'
      //})
      .state('main', {
        url: '/',
        template: '<main></main>'
      })
      .state('tag', {
        url: '/:tag/tag',
        template: '<main></main>'
      })
      .state('search', {
        url: '/search/:q',
        template: '<main></main>'
      });
  });
