'use strict';

angular.module('wikiClothApp')
  .directive('markdownEditor', ['appConfig', '$window', function (appConfig, $window) {
    return {
      restrict: 'EA',
      link: function postLink(scope, element, attrs) {
        var hiddenButtons = attrs.mdHiddenButtons ? attrs.mdHiddenButtons.split(','): [];
        $(element).markdown({
          language: appConfig.language,
          hiddenButtons: hiddenButtons,
          additionalButtons: [
            [{
              name:'groupCustom',
              data: [{
                name: 'cmdHelp',
                toggle: true,
                title: 'Help',
                icon: 'glyphicon glyphicon-question-sign',
                callback: function(e){
                  $window.open('http://daringfireball.net/projects/markdown/syntax', '_blank');
                }
              }]

            }]
          ]
        });
      }
    };
  }]);
