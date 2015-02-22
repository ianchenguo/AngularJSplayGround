/**
 * Created by ian on 2/21/15.
 */
(function () {
  'use strict';
  angular
    .module('blocks.data')
    .factory('postDataService', dataService);

  dataService.$inject = ['$q','loggerService','Post'];
  /* @ngInject */
  function dataService($q,loggerService,Post) {

    var service = {
      createData:createData,
      getData:getData,
      queryData:queryData,
      updateData:updateData,
      deleteData:deleteData
    }

    return service;

    ///////////////
    function createData(data) {
      //resolve the promise and cascade it back
      return Post.save({id:data.id},data).$promise.then(successHandler,errorHandler);

      function successHandler(value) {
        loggerService.logInfo({location:'postDataService',message:'The post is created!', data:JSON.stringify(value)});
        //loggerService.log(value);
        return value;
      }

      function errorHandler(reason) {
        loggerService.logError({location:'postDataService',message:'Cannot create the post!', data:JSON.stringify(reason)});
        //loggerService.log(reason);
        return $q.reject(reason);
      }

    }

    function queryData(){
      return Post.get().$promise.then(successHandler,errorHandler);
      function successHandler(value) {
        loggerService.logInfo({location:'postDataService',message:'The post list is received!', data:JSON.stringify(value)});
        //loggerService.log(value);
        return value;
      }

      function errorHandler(reason) {
        loggerService.logError({location:'postDataService',message:'Cannot query posts!', data:JSON.stringify(reason)});
        //loggerService.log(reason);
        return $q.reject(reason);
      }
    }

    function getData(postId){

      return Post.get({id:postId}).$promise.then(successHandler,errorHandler);
      function successHandler(value) {
        loggerService.logInfo({location:'postDataService',message:'The post is queried!', data:JSON.stringify(value)});
        //loggerService.log(value);
        return value;
      }

      function errorHandler(reason) {
        loggerService.logError({location:'postDataService',message:'Cannot query the post!', data:JSON.stringify(reason)});
        //loggerService.log(reason);
        return $q.reject(reason);
      }
    }

    function updateData(postId,post){
      loggerService.log(JSON.stringify(post));
      //loggerService.log(postId);
      loggerService.log(post);

      return post.$update({id:postId}).then(successHandler,errorHandler);
      function successHandler(value) {
        loggerService.logInfo({location:'postDataService',message:'The post is updated!', data:JSON.stringify(value)});
        //loggerService.log(value);
        return value;
      }

      function errorHandler(reason) {
        loggerService.logError({location:'postDataService',message:'Cannot update the post!', data:JSON.stringify(reason)});
        //loggerService.log(reason);
        return $q.reject(reason);
      }
    }

    function deleteData(postId){
      return Post.delete({id:postId}).$promise.then(successHandler,errorHandler);
      function successHandler(value) {
        loggerService.logInfo({location:'postDataService',message:'The post is deleted!', data:JSON.stringify(value)});
        //loggerService.log(value);
        return value;
      }

      function errorHandler(reason) {
        loggerService.logError({location:'postDataService',message:'Cannot delete the post!', data:JSON.stringify(reason)});
        //loggerService.log(reason);
        return $q.reject(reason);
      }
    }
  }

}());
