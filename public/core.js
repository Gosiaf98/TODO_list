var nodeTodo = angular.module("nodeTodo", []);


function mainController($scope, $http) {
  $scope.formData = {};

  $scope.selectedTab = "all";

  $http                               //load data on start
    .get("/api/todos")
    .success(function(data) {
      $scope.todos = data;
    })
    .error(function(data) {
      console.log("Error: " + data);
    });

    $scope.setTab = function(tab){            //set selected tab
      $scope.selectedTab = tab;
   }

  $scope.createTodo = function() {            //add new to do task 
    $http
      .post("/api/todos", $scope.formData)
      .success(function(data) {
        $("input").val("");
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  $scope.updateTodo = function(id, done) {      //check or uncheck to do task
    console.log(done)
    $http
      .put("api/todos/update/" + id, {'done': done})
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };

  $scope.deleteTodo = function(id) {        //delete to do task
    $http
      .delete("/api/todos/" + id)
      .success(function(data) {
        $scope.todos = data;
      })
      .error(function(data) {
        console.log("Error: " + data);
      });
  };
}
