'use strict';

angular.module('wikiClothApp')
  .directive('elastic',  [
    '$timeout',
    function($timeout) {
      return {
        restrict: 'A',
        link: function($scope, element) {
          $scope.initialHeight = $scope.initialHeight || element[0].style.height;
          var resize = function() {
            element[0].style.height = $scope.initialHeight;
            element[0].style.height = "" + element[0].scrollHeight + "px";
          };
          //element.on("input change", resize);
          element.on("input blur keyup change", resize);
          $timeout(resize, 0);
        }
      };
    }
  ]);
