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
					if(response.isAdmin){
						$location.path('/admin')
					} else {
						$location.path('/');
					}
					
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
			var isAdmin = false;

			if($scope.accountType=="admin"){
				isAdmin = true
			}

			var postData = {
				fullName: $scope.fullName,
				username: $scope.username,
				email: $scope.email,
				password: $scope.password,
				admin: isAdmin
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

appController.controller('AddStoreCtrl',['$scope','$location','$routeParams','checkCreds','InfoUser','Store','LogOut',
	function AddStoreCtrl($scope,$location,$routeParams,checkCreds,InfoUser,AddStore,LogOut){
		if (checkCreds()) {
			InfoUser.infoUser({},function success(response){
				$scope.userId = response.userId

				$scope.addStore = function(){
					var postData = {
						nameStore: $scope.nameStore,
						descriptionStore: $scope.descriptionStore,
					}
		
					console.log(postData);
					AddStore.addStore(postData,function success(response){
						$location.path('/showStores')
					},function error(response){
		
					})
				}

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

appController.controller('ShowStoresCtrl',['$scope','GetStores',
	function ShowStoresCtrl($scope,GetStores){
		$scope.stores = [];
		GetStores.getStores({},function succes(response){
			$scope.stores = response.stores;
		}, function error(response){
			console.log("Erro!!!!!")
		});

	}	
])

appController.controller('DetailStoreCtrl',['$scope','$routeParams','GetInfoStore',
	function DetailStoreCtrl($scope,$routeParams,GetInfoStore){
		var userId = $routeParams.id;
		GetInfoStore.getInfoStore({id:userId},function succes(response){
			$scope.noBranch = true;
			$scope.nameStore = response.store.nameStore;
			$scope.descriptionStore = response.store.descriptionStore;
			$scope.branches = response.store.branches;
			$scope.userId = userId;
			if($scope.branches.length != 0){
				$scope.noBranch = false;
			}
		},function error(response){

		})
	}
])

appController.controller('AddBranchCtrl',['$scope','$location','$routeParams','AddBranch',
	function AddBranchCtrl($scope,$location,$routeParams,AddBranch){
		$scope.addBranch = function(){
			var storeId = $routeParams.id;
			var postData = {
				id:storeId,
				nameBranch: $scope.nameBranch,
				addressBranch: $scope.addressBranch,
				telephoneBranch: $scope.telephoneBranch
			}

			AddBranch.addBranch({id:storeId},postData,function success(response){
				console.log("Exito");
				$location.path('/store/'+storeId);
			},function error(response){
				console.log("Error");
				console.log(response);
			})
		}
	}	
]);

appController.controller('ShowProductsCtrl',["$scope","$routeParams","GetInfoBranch",
	function ShowProductsCtrl($scope,$routeParams,GetInfoBranch){
		$scope.noProducts = true;

		let idStore = $routeParams.idStore;
		let idBranch = $routeParams.idBranch;
		
		GetInfoBranch.getInfoBranch({idStore:idStore,idBranch:idBranch},{},function success(response){
			$scope.nameBranch = response.branch.nameBranch;
			$scope.products = response.branch.products;
		},function error(response){

		});
		
	}
])