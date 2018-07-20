var login_mean = angular.module('appLoginMean',['ngRoute','appController']);

login_mean.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
		.when("/",{
			templateUrl: 'partials/index.html',
			controller: 'IndexCtrl'
		})
		.when("/login",{
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		})
		.when("/register",{
			templateUrl:'partials/register.html',
			controller: 'RegisterCtrl'
		})
		.when("/edit/:id",{
			templateUrl: 'partials/editUser.html',
			controller: 'EditUserCtrl'
		})

	$locationProvider.html5Mode(false).hashPrefix("!");
}])