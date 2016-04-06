angular.module("Franchino.portal", [ "auth0" ]).controller "HomeCtrl", HomeController = ($scope, auth, $http, $location, store) ->
  $scope.auth = auth
  
  $scope.callApi = ->
    
    # Just call the API as you'd do using $http
    $http(
      url: "http://localhost:3001/secured/ping"
      method: "GET"
    ).then (->
      alert "We got the secured data successfully"
    ), (response) ->
      if response.status is -1
        alert "Please download the API seed so that you can call it."
      else
        alert response.data


  $scope.logout = ->
    auth.signout()
    store.remove "profile"
    store.remove "token"
    $location.path "/login"
