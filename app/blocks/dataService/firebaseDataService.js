/**
 * Created by ian on 2/22/15.
 */
(function () {
  'use strict';
  angular
    .module('blocks.data')
    .factory('httpDataService', dataService);

  dataService.$inject = ['$firebase'];
  /* @ngInject */
  function dataService($firebase) {

    var ref = new Firebase(BASE_URL + '/posts');
    var sync = $firebase(ref);


    var service = {}

    return service;


  }
}());
