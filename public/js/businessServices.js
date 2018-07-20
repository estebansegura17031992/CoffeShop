var appBusinessServices = angular.module('appBusinessServices',['ngCookies']);

appBusinessServices.factory('checkCreds',['$cookies',
	function($cookies){
		return function(){
			var returnVal = false;
	        var appCreds = $cookies.get("session");
	        if (appCreds !== undefined && appCreds !== "") {
	            returnVal = true;
	        }
	        return returnVal;
		}
	}
]);