/**
 * Created by ian on 2/21/15.
 */
(function () {
  angular
    .module('app.postList')
    .controller('PostListController', PostListController);

  PostListController.$inject = ['loggerService', 'postDataService'];
  /* @ngInject */
  function PostListController(loggerService, postDataService) {

    var vm = this;
    var privateProperties = {};
    privateProperties.emptyCurrentPost = emptyCurrentPost;
    privateProperties.initData = initData;
    privateProperties.loadPosts = loadPosts;


    vm.posts = {};
    vm.post = {title: '', url: 'http://'};
    vm.postId = '';

    vm.createPost = createPost;
    vm.getPost = getPost;
    vm.updatePost = updatePost;
    vm.deletePost = deletePost;
    vm.savePost = savePost;


    activate();

    ////////////
    function activate(){
      privateProperties.emptyCurrentPost();
      privateProperties.initData();
    }

    function initData(){
      privateProperties.loadPosts();
    }

    function loadPosts(){
      return postDataService.queryData().then(successHandler);

      function successHandler(value){
        vm.posts = value || {};
        //loggerService.log(vm.posts);
        return value;
      }
    }

    function savePost(){

      if(vm.postId) {
        return updatePost();
      } else {
        return createPost();
      }
    }


    function createPost(){
      var promise = postDataService.createData(vm.post);
      return promise.then(successHandler);

      function successHandler(value){
        vm.posts[value.name] = vm.post;
        vm.post = {title: '', url: 'http://'};
        return value;
      }
    }


    function getPost(postId){

      var promise = postDataService.getData(postId);
      return promise.then(successHandler);

      function successHandler(value){
        vm.post = value;
        vm.postId = postId;
        return value;
      }
    }

    function deletePost(postId){

      var promise = postDataService.deleteData(postId);
      return promise.then(successHandler);

      function successHandler(value){
        delete vm.posts[postId];
        return value;
      }
    }

    function updatePost(){
      var promise = postDataService.updateData(vm.postId,vm.post);
      return promise.then(successHandler);

      function successHandler(value) {
        vm.posts[vm.postId] = value;
        privateProperties.emptyCurrentPost();
        return value;
      }
    }

    function emptyCurrentPost(){
      vm.post = {title: '', url: 'http://'};
      vm.postId = '';
    }
  }
}());
