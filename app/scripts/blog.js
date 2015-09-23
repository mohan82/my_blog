(function () {
  var blogModule = angular.module("Blog", []);

  blogModule.service('blogService', function ($http) {
    var RANDOM_URL = 'http://localhost:3000/random'
    var self = this;
  self.getRandomTitle = function () {
    return $http.get(RANDOM_URL + '/title').then(function (result) {
      return result.data;
    });

  }

  self.getRandomImageUrl = function (id, width, height) {

    return RANDOM_URL + '/image/' + id + "/" + width + "/" + height;
  };

  self.getRandomText = function () {
    return $http.get(RANDOM_URL + '/text').then(function (result) {
      return result.data;
    });

  }


  });
  blogModule.controller('BlogController', function ($scope, blogService, $q) {
    $scope.blog = {};
    $scope.blog.blogs = [];
    $scope.blog.image = {
      width: '320',
    height: '240'
    };
    $scope.init = function () {
      _.range(1, 40).forEach(function (index) {
        $q.all({
          title: blogService.getRandomTitle(),
          content: blogService.getRandomText()
        }).then(function (result) {
          var imageUrl = blogService.
          getRandomImageUrl(index, $scope.blog.image.width,
            $scope.blog.image.height)
          $scope.blog.blogs.push(
            {
              title: result.title,
          image: imageUrl,
          content: result.content
            }
            );

        });
      })

    };

    $scope.init();
  });
})();
