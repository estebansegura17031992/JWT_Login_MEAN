appController = angular.module('appController',['appServices','appBusinessServices']);

appController.controller('IndexCtrl',['$scope','$location','checkCreds',
	function IndexCtrl($scope,$location,checkCreds){
		if (checkCreds()) {
			$scope.message = "Welcome to the application"
		} else {
			$location.path("/login")
		}
	}
]);

appController.controller('LoginCtrl',['$scope','Login',
	function LoginCtrl($scope,Login){
		$scope.loginComplete = false;
		$scope.loginError = false;

		$scope.login = function(login){
			var postData = {
				'email':$scope.email,
				'password':$scope.password
			};
			Login.login({},postData,function success(response){
				$scope.loginComplete = true;
			},function error(errorResponse){
				
			});
		};
	}
])