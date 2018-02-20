var app_business_servicess = angular.module('appBusinessServices',['ngCookies']);

app_business_servicess.factory('checkCreds',['$cookies',
	function($cookies){
		return function(){
			var returnVal = false;
	        var appCreds = $cookies.token;
	        if (appCreds !== undefined && appCreds !== "") {
	            returnVal = true;
	        }
	        return returnVal;
		}
	}
])

