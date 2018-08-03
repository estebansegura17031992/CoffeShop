var login_mean = angular.module('appLoginMean',['ngRoute','appController']);

login_mean.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
		.when("/",{
			templateUrl: 'partials/index.html',
			controller: 'IndexCtrl'
		})
		.when("/admin",{
			templateUrl: 'partials/indexAdmin.html',
			controller: 'IndexCtrl'
		})
		.when("/addStore",{
			templateUrl: 'partials/addStore.html',
			controller: 'AddStoreCtrl'
		})
		.when("/showStores",{
			templateUrl: 'partials/showStores.html',
			controller: 'ShowStoresCtrl'
		})
		.when("/store/:id",{
			templateUrl: 'partials/detailStore.html',
			controller: 'DetailStoreCtrl'
		})
		.when("/store/:id/addBranch",{
			templateUrl: 'partials/addBranch.html',
			controller: 'AddBranchCtrl'
		})
		.when("/store/:idStore/branch/:idBranch",{
			templateUrl: 'partials/showProducts.html',
			controller: 'ShowProductsCtrl'
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