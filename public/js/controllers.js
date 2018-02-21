appController = angular.module('appController',['appServices','appBusinessServices','ngCookies']);

appController.controller('IndexCtrl',['$scope','$location','checkCreds',
	function IndexCtrl($scope,$location,checkCreds){
		console.log(checkCreds());
		if (checkCreds()) {
			$scope.message = "Welcome to the application"
		} else {
			$location.path("/login")
		}
	}
]);

appController.controller('LoginCtrl',['$scope','$routeParams','$location','$cookies','Login',
	function LoginCtrl($scope,$routeParams,$location,$cookies,Login){
		$scope.loginComplete = false;
		$scope.loginError = false;
		$scope.registerComplete = false;

		if($routeParams.register==true){
			$scope.registerComplete = true;
		}

		$scope.login = function(){
			var postData = {
				'email':$scope.email,
				'password':$scope.password
			};
			Login.login({},postData,function success(response){
				if(response.success){
					$scope.loginComplete = true;
					$location.path('/');
				}
				else 
					$scope.loginError = true;
			},function error(errorResponse){

			});
		};

	}
]);

appController.controller('RegisterCtrl',['$scope','$location', 'Register',
	function RegisterCtrl($scope,$location,Register){
		$scope.register = function(){
			var postData = {
				username: $scope.username,
				email: $scope.email,
				password: $scope.password
			}

			Register.register({},postData,function success(response){
				$location.path("/login").search({register: 'true'});
			},function error(errorResponse){

			})
		}
	}
])