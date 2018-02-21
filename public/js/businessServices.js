var app_business_servicess = angular.module('appBusinessServices',['ngCookies']);

app_business_servicess.factory('checkCreds',['$cookies','$cookieStore',
	function($cookies,$cookieStore){
		return function(){
			var returnVal = false;
	        var appCreds = $cookies.get("session");
	        if (appCreds !== undefined && appCreds !== "") {
	            returnVal = true;
	        }
	        return returnVal;
		}
	}
])

