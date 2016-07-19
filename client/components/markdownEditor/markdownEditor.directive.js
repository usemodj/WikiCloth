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
              name: 'groupLink',
              data: [{
                name: 'cmdWikiLink',
                hotkey: 'Ctrl+W',
                toggle: true,
                title: 'Wiki Link',
                icon: 'fa fa-file-word-o fa-lg',
                callback: function(e){
                  var chunk, cursor,
                    selected = e.getSelection(), content = e.getContent();
                  //transform selection and set cursor into chunked text
                  if(selected.length === 0){
                    //give extra word
                    chunk = e.__localize('Wiki Link');
                  } else {
                    chunk = selected.text;
                  }

                  e.replaceSelection('[[' + chunk + ']]');
                  cursor = selected.start + 2;

                  //set the cursor
                  e.setSelection(cursor, cursor + chunk.length);

                }
              },{
                name: 'cmdTOC',
                hotkey: 'Ctrl+T',
                toggle: false,
                title: 'TOC (Table Of Contents)',
                icon: 'fa fa-bookmark fa-lg',
                callback: function(e){
                  var chunk, cursor,
                    selected = e.getSelection(), content = e.getContent();
                  //transform selection and set cursor into chunked text
                  //give extra word
                  chunk = e.__localize('TOC');
                  e.replaceSelection('[' + chunk + ']');
                  cursor = selected.start;

                  //set the cursor
                  e.setSelection(cursor, cursor + chunk.length+2);

                }
              }]
            }, {
              name:'groupCustom',
              data: [{
                name: 'cmdHelp',
                hotkey: 'Ctrl+H',
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
