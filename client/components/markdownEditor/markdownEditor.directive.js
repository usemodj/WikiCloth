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
              name: 'groupFont',
              data: [{
                name: 'cmdMath',
                hotkey: 'Ctrl+M',
                title: 'Block Mathematics',
                icon: 'fa fa-calculator',
                callback: function(e) {
                  // Give/remove ** surround the selection
                  var chunk, cursor, selected = e.getSelection(),
                    content = e.getContent();

                  if (selected.length === 0) {
                    // Give extra word
                    chunk = e.__localize('y=x^2');
                  } else {
                    chunk = selected.text;
                  }

                  // transform selection and set the cursor into chunked text
                  if (content.substr(selected.start - 2, 2) === '$$' &&
                    content.substr(selected.end, 2) === '$$') {
                    e.setSelection(selected.start - 2, selected.end + 2);
                    e.replaceSelection(chunk);
                    cursor = selected.start - 2;
                  } else if (content.substr(selected.start - 1, 1) === '$' &&
                    content.substr(selected.end, 1) === '$') {
                    e.setSelection(selected.start - 1, selected.end + 1);
                    e.replaceSelection(chunk);
                    cursor = selected.start - 1;
                  } else {
                    e.replaceSelection('$$' + chunk + '$$');
                    cursor = selected.start + 2;
                  }

                  // Set the cursor
                  e.setSelection(cursor, cursor + chunk.length);
                }
              },{
                name: 'cmdMath2',
                hotkey: 'Ctrl+C',
                title: 'Inline Mathematics',
                icon: 'fa fa-superscript',
                callback: function(e) {
                  // Give/remove ** surround the selection
                  var chunk, cursor, selected = e.getSelection(),
                    content = e.getContent();

                  if (selected.length === 0) {
                    // Give extra word
                    chunk = e.__localize('y=x^2');
                  } else {
                    chunk = selected.text;
                  }

                  // transform selection and set the cursor into chunked text
                  if (content.substr(selected.start - 2, 2) === '$$' &&
                    content.substr(selected.end, 2) === '$$') {
                    e.setSelection(selected.start - 2, selected.end + 2);
                    e.replaceSelection(chunk);
                    cursor = selected.start - 2;
                  } else if (content.substr(selected.start - 1, 1) === '$' &&
                    content.substr(selected.end, 1) === '$') {
                    e.setSelection(selected.start - 1, selected.end + 1);
                    e.replaceSelection(chunk);
                    cursor = selected.start - 1;
                  } else {
                    e.replaceSelection('$' + chunk + '$');
                    cursor = selected.start + 1;
                  }

                  // Set the cursor
                  e.setSelection(cursor, cursor + chunk.length);
                }
              },{
                name: 'cmdNoWiki',
                hotkey: 'Ctrl+N',
                title: 'No Wiki text',
                icon: 'fa fa-file-code-o',
                callback: function(e) {
                  // Give/remove ** surround the selection
                  var chunk, cursor, selected = e.getSelection(),
                    content = e.getContent();

                  if (selected.length === 0) {
                    // Give extra word
                    chunk = e.__localize('no wiki text here');
                  } else {
                    chunk = selected.text;
                  }

                  // transform selection and set the cursor into chunked text
                  if (content.substr(selected.start - 8, 8) === '<nowiki>' &&
                    content.substr(selected.end, 9) === '</nowiki>') {
                    e.setSelection(selected.start - 8, selected.end + 9);
                    e.replaceSelection(chunk);
                    cursor = selected.start - 8;
                  } else {
                    e.replaceSelection('<nowiki>' + chunk + '</nowiki>');
                    cursor = selected.start + 8;
                  }

                  // Set the cursor
                  e.setSelection(cursor, cursor + chunk.length);
                }
              }]
            },{
                name: 'groupLink',
                data: [{
                  name: 'cmdWikiLink',
                  hotkey: 'Ctrl+W',
                  toggle: false,
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

                    // transform selection and set the cursor into chunked text
                    if (content.substr(selected.start - 2, 2) === '[[' &&
                      content.substr(selected.end, 2) === ']]') {
                      e.setSelection(selected.start - 2, selected.end + 2);
                      e.replaceSelection(chunk);
                      cursor = selected.start - 2;
                    } else {
                      e.replaceSelection('[[' + chunk + ']]');
                      cursor = selected.start + 2;
                    }

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
                    //if(selected.length === 0){
                      //give extra word
                      chunk = e.__localize('TOC');
                    //} else {
                    //  chunk = selected.text;
                    //}

                    // transform selection and set the cursor into chunked text
                    if (content.substr(selected.start - 1, 1) === '[' &&
                      content.substr(selected.end, 1) === ']') {
                      e.setSelection(selected.start - 1, selected.end + 1);
                      e.replaceSelection('');
                      cursor = selected.start - 1;
                    } else {
                      e.replaceSelection('[' + chunk + ']');
                      cursor = selected.start + 1;
                    }


                    //set the cursor
                    e.setSelection(cursor, cursor + chunk.length);

                  }
                }]
            },{
              name:'groupCustom',
              data: [{
                name: 'cmdHelp',
                hotkey: 'Ctrl+Alt+H',
                toggle: true,
                title: 'Markdown Syntax Help',
                icon: 'glyphicon glyphicon-question-sign',
                callback: function(e){
                  $window.open('http://daringfireball.net/projects/markdown/syntax', '_blank');
                }
              },{
                name: 'cmdMathHelp',
                hotkey: 'Ctrl+Alt+M',
                toggle: true,
                title: 'MathJax Mathematics Help',
                icon: 'fa fa-question-circle-o',
                callback: function(e){
                  $window.open('http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference', '_blank');
                }
              }]

            }]
          ]
        });
      }
    };
  }]);
