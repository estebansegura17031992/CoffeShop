appController = angular.module('appController',['appServices','appBusinessServices','ngCookies']);

appController.controller('IndexCtrl',['$scope','$location','checkCreds','InfoUser','LogOut',
	function IndexCtrl($scope,$location,checkCreds,InfoUser,LogOut){
		$scope.active_home = "active"
		if (checkCreds()) {
			InfoUser.infoUser({},function success(response){
				$scope.message = "Welcome to the application "+response.username;
				$scope.userId = response.userId

				$scope.logOut = function(){
						LogOut.logOut({id:$scope.userId},{},function success(response){
						$location.path('/login')
					},function error(errorResponse){
						console.log(errorResponse);
					})
				}
			},function error(errorResponse){
				$scope.message = errorResponse;
			})
			
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
]);

appController.controller('EditUserCtrl',['$scope','$location','$routeParams','EditUser','InfoUser','LogOut',
	function EditUserCtrl($scope,$location,$routeParams,EditUser,InfoUser,LogOut){
		var userId = $routeParams.id;
		$scope.active_edit = "active";
		InfoUser.infoUser({},function success(response){
			$scope.username = response.username;
			$scope.email = response.email;
			$scope.userId = response.userId;
		},function error(errorResponse){
			$scope.error = true;
			$scope.messageError = errorResponse;
		})

		$scope.editUser = function(){
			var postData = {
				username:$scope.username,
				email:$scope.email
			}
			EditUser.editUser({id: userId},postData,function success(response){
				$location.path("/").search({edit:'true'});
			},function error(errorResponse){

			});
		}

		$scope.logOut = function(){
				LogOut.logOut({id:userId},{},function success(response){
				$location.path('/login')
			},function error(errorResponse){
				console.log(errorResponse);
			})
		}
	}
]);