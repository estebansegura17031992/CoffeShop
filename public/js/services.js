var appServices = angular.module('appServices',['ngResource']);

appServices.factory('Login',['$resource',
	function($resource){
		return $resource('api/authentication/login',{},{
			login: {method: 'POST',cache:false,isArray: false}
		})
	}
])

appServices.factory("Register",['$resource',
	function($resource){
		return $resource('api/authentication/register',{},{
			register: {method: 'POST', cache:false, isArray: false}
		})
	}
]);

appServices.factory("InfoUser",['$resource',
	function($resource){
		return $resource('api/user/infoUser',{},{
			infoUser: {method: 'GET',cache:false,isArray:false}
		})
	}
]);

appServices.factory("EditUser",['$resource',
	function($resource){
		return $resource('api/user/editUser/:id',{},{
			editUser: {method: 'POST',cache:false, isArray:false}
		})
	}
]);

appServices.factory("LogOut",['$resource',
	function($resource){
		return $resource('api/user/logOut/:id',{},{
			logOut: {method:'POST',cache:false,isArray:false}
		})
	}
])