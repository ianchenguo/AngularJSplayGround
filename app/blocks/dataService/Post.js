/**
 * Created by ian on 2/21/15.
 */
(function () {
  'use strict';
  angular
    .module('blocks.data')
    .factory('Post', Post);

  Post.$inject = ['$resource'];
  /* @ngInject */
  function Post($resource) {
    return $resource(
      'https://ianchenguo-ng-news.firebaseio.com/posts/:id.json'
      ,{}
      ,{update:{method:'PATCH'}}
    );
  }
}());
