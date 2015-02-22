/**
 * Created by ian on 2/19/15.
 */
(function(){
  angular
    .module('app.test')
    .controller('TestController',TestController);

  TestController.$inject = ['loggerService','httpDataService'];
  /* @ngInject */
  function TestController(loggerService,httpDataService){
    var vm = this;

    vm.testVariable = 'test variable';
    vm.posts = {};
    vm.post = {title:'',url:'http://'};
    vm.postId = '';

    vm.editPost = editPost;
    vm.createPost = createPost;
    vm.deletePost = deletePost;
    vm.updatePost = updatePost;
    vm.savePost = savePost;


    activate();

    /////
    function activate() {
      initData();
    }

    function initData() {
      //the second promise in the chain
      var promise = httpDataService.getData();
      //same as previous, the promise call will return a new promise object
      //and this object can be returned further
      return promise.then(function successHandler(value){
          vm.posts = value.data || {};
        }
      )
    }

    function editPost(postId){
      vm.postId = postId;
      vm.post = vm.posts[postId];

      console.log(vm.postId);
      console.log(vm.post);
    }

    function savePost(){
      if(vm.postId) {
        vm.updatePost();
      } else {
        vm.createPost();
      }
    }

    function createPost() {
      var promise = httpDataService.saveData(vm.post);

      return  promise.then(
        function successHandler(value){

          vm.posts[value.data.name] = vm.post;
          refreshPost();
        },
        function errorHandler(){
          refreshPost();
        }
      );
    }

    function refreshPost() {
      vm.postId = '';
      vm.post = {title:'',url:'http://'};
    }

    function deletePost(id) {
      var promise = httpDataService.deleteData(id);
      //do nothing for now
      return promise.then(function successHandler(){

        delete vm.posts[id];
      });
    }

    function updatePost() {
      console.log(vm.postId);
      var promise = httpDataService.updateData(vm.postId,vm.post);
      return promise.then(function successHandler(value){
        //need to do sth
        vm.posts[vm.postId] = value.data;
        refreshPost();
      });
    }
  }
}());
