'use strict';

angular.module('wikiClothApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('wiki', {
        parent: 'site',
        abstract: true,
        url: '/wiki',
        template: '<div ui-view></div>'
      })
      .state('wiki.view', {
        url: '/:name',
        template: '<wiki></wiki>'
      })
      .state('wiki.edit', {
        authenticate: true,
        url: '/:name/edit',
        template: '<edit-wiki></edit-wiki>'
      })
      .state('wiki.history', {
        url: '/:name/history',
        template: '<history-wiki></history-wiki>'
      });
  });
