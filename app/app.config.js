/**
 * Created by ian on 2/19/15.
 */

(function(){
  'use strict';

  angular
    .module('app')
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'posts/postList.html',
          controller: 'PostListController',
          controllerAs:'vm'
        })
        .when('/test', {
          templateUrl:'test/test.html',
          controller:'TestController',
          controllerAs:'vm'
        })
        .otherwise({
          redirectTo: '/'
        });
    });
}());


