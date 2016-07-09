'use strict';

angular.module('wikiClothApp')
  .directive('inputfile', function () {
    return {
      templateUrl: 'components/inputfile/inputfile.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
        element.addClass('input');
      }
    };
  });
