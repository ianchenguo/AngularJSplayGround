/**
 * Created by ian on 2/20/15.
 */
'use strict';
(function(){
  angular
    .module('common.toastr')
    .config(configure);

  //////
  configure.$inject = ['toastr'];
  /* @ngInject */
  function configure(toastr){
    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": true,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    }
  }
}());
