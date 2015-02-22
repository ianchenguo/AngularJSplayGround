/**
 * Created by ian on 2/19/15.
 */
(function(){
  'use strict';
  angular
    .module('blocks.data')
    .factory('httpDataService',dataService);

  dataService.$inject = ['$http','$q','loggerService'];
  /* @ngInject */
  function dataService($http,$q,loggerService){

    var baseUrl = 'https://ianchenguo-ng-news.firebaseio.com/';
    var dataService = {
      getData:getData,
      saveData:saveData,
      deleteData:deleteData,
      updateData:updateData
    };
    return dataService;

    /////////
    function getData() {
      //the first promise in the chain
      var promise = $http.get(baseUrl + 'posts.json');
      //the promise call will return a cascading promise object
      //then, the key is to return this object to the invoker of current promise
      return promise
        .then(successHandler)
        .catch(errorHandler);

      function successHandler(value) {
        //simply pass the return value to the next promise
        return value;
      }

      function errorHandler(reason) {
        //do something to handle errors
        loggerService.logError(
          {location:'dataService',
            message:'Error occurred during the post process!',
            data:reason.data});

        //a key step to chain the rejected promise
        return $q.reject(reason);
      }
    }


    function saveData(data) {
      var promise = $http.post(baseUrl + 'posts.json', data);

      return promise
        .then(successHandler)
        .catch(errorHandler);

      function successHandler(value) {
        //simply pass the return value to the next promise


        loggerService.logInfo(
          {location:'dataService',
          message:'the post is successful!',
          data:value.data.name});
        return value;
      }

      function errorHandler(reason) {
        //do something to handle errors
        loggerService.logError(
          {location:'dataService',
          message:'the post is failed!',
          data:reason.data});

        return $q.reject(reason);
      }
    }

    function deleteData(id) {
      var promise = $http.delete(baseUrl + 'posts/' + id + '.json');
      return promise
        .then(successHandler)
        .catch(errorHandler);

      function successHandler(value) {
        loggerService.log(value);

        loggerService.logInfo(
          {location:'dataService',
            message:'the deletion is successful!',
            data:value.data});
        return value;
      }

      function errorHandler(reason) {
        loggerService.logError(
          {location:'dataService',
            message:'the deletion is failed!',
            data:reason.data});

        return $q.reject(reason);
      }
    }

    function updateData(id,data){

      var promise= $http.put(baseUrl + 'posts/' + id + '.json', data);
      return promise
        .then(successHandler)
        .catch(errorHandler);

      function successHandler(value) {

        loggerService.log(value);

        loggerService.logInfo(
          {location:'dataService',
          message:'the update is successful!',
          data:value.data});
        return value;
      }

      function errorHandler(reason){
        loggerService.logError(
          {location:'dataService',
            message:'the update is failed!',
            data:reason.data});

        return $q.reject(reason);
      }
    }
  }
}());
