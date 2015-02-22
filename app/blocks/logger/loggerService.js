/**
 * Created by ian on 2/20/15.
 */
(function(){
  'use strict';
  angular
    .module('blocks.logger')
    .provider('loggerService',loggerService);

  function loggerService() {
    //private members
    var showLog = true;
    var showToastr = true;
    //public members
    var loggerServiceProvider = {
      logEnabled:logEnabled,
      toastrEnabled:toastrEnabled,
      $get:['$log','toastr',loggerServiceFactory]
    };
    //return the provider's API object
    return loggerServiceProvider;
    /////////

    //function implementations
    //configure the showLog property
    function logEnabled(setting){
      //by convention, if a setting is passed in,
      //the private property is updated accordingly,
      //and the provider object is passed back for cascading fluid calls
      if(angular.isDefined(setting)) {
        showLog = setting;
        return this;
        //by convention, if a setting is not passed in,
        //this function is treated as a getter of the private property
      } else {
        return showLog;
      }
    }

    function toastrEnabled(setting) {
      if(angular.isDefined(setting)) {
        showToastr = setting;
        return this;
      } else {
        return showToastr;
      }
    }

    //implement $get
    /* @ngInject */
    function loggerServiceFactory($log,toastr) {
      //private members
      var privateProperties = {};
      privateProperties.counter = 0;
      privateProperties.setLogContent = setLogContent;

      //public members
      var service = {
        logInfo: logInfo,
        logWarning: logWarning,
        logError: logError,
        logDebug: logDebug,
        //straight log to console
        log:$log.log
      };
      return service;
      ////////

      function setLogContent(settings){
        return '(' + ++privateProperties.counter + ') ' +
          '[' + settings.logType + '] ' +
          '[AT: '+ settings.location + '] ' +
          'MESSAGE: ' + settings.message + ' ' +
          'DATA: ' + settings.data;
      }


      function logInfo(settings){
        if(showLog) {
          $log.info(setLogContent(
            {logType:'INFO',
            location:settings.location,
            message:settings.message,
            data:settings.data}));
        }
        if(showToastr) {
          toastr.info(settings.message);
        }
      }

      function logWarning(settings){
        if(showLog) {
          $log.warn(setLogContent(
            {logType:'WARNING',
              location:settings.location,
              message:settings.message,
              data:settings.data}));
        }
        if(showToastr) {
          toastr.warn(settings.message);
        }
      }

      function logError(settings){
        if(showLog) {
          $log.error(setLogContent(
            {logType:'ERROR',
              location:settings.location,
              message:settings.message,
              data:settings.data}));
        }
        if(showToastr) {
          toastr.error(settings.message);
        }
      }

      function logDebug(settings){
        if(showLog) {
          $log.debug(setLogContent(
            {logType:'DEBUG',
              location:settings.location,
              message:settings.message,
              data:settings.data}));
        }
      }
    }
  }
}());
