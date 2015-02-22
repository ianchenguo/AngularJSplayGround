/**
* Created by ian on 2/20/15.
*/

(function(){
  'use strict';
  angular
    .module('blocks.logger')
    .config(configure);

  //////
  configure.$inject = ['$logProvider','loggerServiceProvider'];
  /* @ngInject */
  function configure($logProvider,loggerServiceProvider){


    $logProvider.debugEnabled(true);

    loggerServiceProvider
      .logEnabled(true)
      .toastrEnabled(true);
  }
}());
