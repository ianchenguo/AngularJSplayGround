/**
 * Created by ian on 2/19/15.
 */
(function(){
  'use strict';
  angular
    .module('app.core',[
      //1st party modules
      'ngAnimate',
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',

      //3rd party modules
      'common.toastr',

      //my modules
      'blocks.data',
      'blocks.logger'
    ]);
}());



