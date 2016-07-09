'use strict';

function WikiService($resource) {
  // Public API here
  return $resource('/api/wikis/:name/:controller', { name: '@name'},{
    //query
    //get
    //save
    //delete, remove
    update: { method: 'PUT'},
    //search: {
    //  method: 'POST',
    //  params: {
    //    controller: 'search'
    //  }
    //},
    revisions: {
      method: 'GET',
      isArray: true,
      params: {
        controller: 'revisions'
      }
    }
  });
}


angular.module('wikiClothApp')
  .factory('Wiki', WikiService);
