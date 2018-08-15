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

appController.controller('AddStoreCtrl',['$scope','$location','$routeParams','checkCreds','InfoUser','AddStore','LogOut',
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
		$scope.noProducts = false;

		$scope.idStore = $routeParams.idStore;
		$scope.idBranch = $routeParams.idBranch;
		
		GetInfoBranch.getInfoBranch({idStore:$scope.idStore,idBranch:$scope.idBranch},{},function success(response){
			$scope.nameBranch = response.branch.nameBranch;
			if(response.branch.products.length==0){
				$scope.noProducts = true;
			}
			$scope.products = response.branch.products;

			
		},function error(response){

		});
		
	}
])

appController.controller('AddProductCtrl',["$scope","$routeParams","$location","AddProduct",
	function AddProductCtrl($scope,$routeParams,$location,AddProduct){
		$scope.addProduct = function(){
			var nameProduct = $scope.nameProduct;
			var priceProduct = $scope.priceProduct;
			var descriptionProduct = $scope.descriptionProduct;
			var idBranch = $routeParams.idBranch;
			var idStore = $routeParams.idStore;

			AddProduct.addProduct({idStore:idStore,idBranch:idBranch},
									{nameProduct:nameProduct,priceProduct:priceProduct,
									descriptionProduct,descriptionProduct},function success(response){
										$location.path("store/"+idStore+"/branch/"+idBranch);
									},function error(errorResponse){

									})




		};
	}
])

appController.controller("DetailProduct",["$scope","$routeParams","GetProduct",
	function DetailProduct($scope,$routeParams,GetProduct){
		var idStore = $routeParams.idStore;
		var idBranch = $routeParams.idBranch;
		var idProduct = $routeParams.idProduct;
		
		GetProduct.getProduct({idStore,idBranch,idProduct},{},function success(response){
			$scope.product = response.product;
		},function error(errorResponse){
			
		});
	}])

appController.controller('ShopCtrl',["$scope","$cookies","GetStores","GetInfoStore","GetInfoBranch",
	function ShopCtrl($scope,$cookies,GetStores,GetInfoStore,GetInfoBranch){
		
		
		GetStores.getStores({},{},function success(response){
			$scope.stores = response.stores;

			$scope.selectStore = "-1";
			$scope.selectBranch = "-1";
		},function error(errorResponse){

		})
		$scope.hasBranch = false;
		$scope.showBranches = function(){
			if(!$scope.selectStore!="-1"){
				GetInfoStore.getInfoStore({id:$scope.selectStore},{},function success(response){
					$scope.branches = response.store.branches;
					if(response.store.branches.length!=0){
						$scope.hasBranch = true;
					} else {
						$scope.hasBranch = false;
					}

				},function error(errorResponse){
	
				})
			}
		}


		$scope.hasProducts = false;
		$scope.showProducts = function(){
			if(!$scope.selectBranch != "-1"||$scope.selectBranch != "-2"){
				GetInfoBranch.getInfoBranch({idStore:$scope.selectStore,idBranch:$scope.selectBranch},{},function success(response){
					$scope.products = response.branch.products;
					if($scope.products.length>0){
						$scope.hasProducts = true;
					} else {
						$scope.hasProducts = false;	
					}
				},function error(errorResponse){

				})
			}
		}

		$scope.agregarCarrito = function(product){
			console.log(product)
			var carShopping = [];
			if($cookies.getObject("carShopping")!=undefined){
				carShopping = $cookies.getObject("carShopping");
			}
			carShopping.push(product)
			$cookies.putObject("carShopping",carShopping);
		}
	}
])

appController.controller("CheckoutCtrl",["$scope","$cookies","$location","Shop",
	function($scope,$cookies,$location,Shop){
		$scope.items = $cookies.getObject("carShopping")
		$scope.total = 0
		if($scope.items != undefined){
			
			for (let i = 0; i < $scope.items.length; i++) {
				$scope.total = $scope.total+$scope.items[i].priceProduct;
			}

			$scope.shop = function(){
				Shop.shop({},{carShop:$scope.items},function success(response){
					$cookies.remove("carShopping");
					alert("Compra completada");
					$location.path("/shop");
				},function error(errorResponse){

				})
			}
		} else {
			$scope.items = [];
		}
		
	}
]);

appController.controller("ViewShopCtrl",["$scope","GetShops",
	function($scope,GetShops){
		$scope.shops = [];
		GetShops.getShops({},{},function success(response){
			$scope.shops = response.shopping;
			
		},function error(responseError){

		})

	}
])