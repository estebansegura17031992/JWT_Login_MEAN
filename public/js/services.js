var appServices = angular.module('appServices',['ngResource']);

appServices.factory('Login',['$resource',
	function($resource){
		return $resource('api/authentication/login',{},{
			login: {method: 'POST',cache:false,isArray: false}
		})
	}
])