'use strict';

function TalkService($resource) {
  // Public API here
  return $resource('/api/comments/:id/:controller', { id: '@_id'},{
    //query
    //get
    //save
    //delete, remove
    update: { method: 'PUT'}
    //search: {
    //  method: 'POST',
    //  params: {
    //    controller: 'search'
    //  }
    //},
    //talk: {
    //  method: 'GET',
    //  isArray: true,
    //  params: {
    //    controller: 'talk'
    //  }
    //}
  });
}


angular.module('wikiClothApp')
  .factory('Talk', TalkService);
