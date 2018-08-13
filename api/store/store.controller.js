var Store = require('./store.model.js');

function addStore(req,res,next){
    var newStore = new Store(req.body);
    
    newStore.save(function(err, store) {
    	if (err) {
      		return res.status(400).send({success: false,message: err});
    	} else {
      		return res.status(200).send({success: true,store:store});
    	}
  	});

}

function getStores(req,res,next){
	Store.find({},function(err,stores){
		if(err){
			return res.status(400).send({success: false,message: err});
    	} else {
      		return res.status(200).send({success: true,stores:stores});
    	}
	})
}

function infoStore(req,res,next){
	Store.findById({_id:req.params.id},function(err,store){
		if(err){
			return res.status(400).send({success: false,message: err});
    	} else {
      		return res.status(200).send({success: true,store:store});
		}
	})
}

function addBranch(req,res,next){
	Store.findById({_id:req.params.id},function(err,store){
		if(err){
			return res.status(400).send({success: false,message: err});
    	} else {
			var actualStore = store;
			actualStore.branches.push({
				nameBranch: req.body.nameBranch,
				addresBranch: req.body.addresBranch,
				telephoneBranch: req.body.telephoneBranch
			})
			actualStore.save(function(err, store) {
				if (err) {
					return res.status(400).send({success: false,message: err});
				} else {
					return res.status(200).send({success: true,store:store});
				}
			});
		}
	})
}

function getInfoBranch(req,res,next){
	Store.findById({_id:req.params.idStore},function(error,store){
		if(error){
			return res.status(400).send({success: false,message: err});
		} else {
			var branches = store.branches;
			let products = []
			for (let i = 0; i < branches.length; i++) {
				if(branches[i]._id = req.params.idBranch){
					return res.status(200).send({success: true,branch:branches[i]});
					
				}
			}

			
		}
	});
}

function addProduct(req,res,next){
	var nameProduct = req.body.nameProduct;
	var priceProduct = req.body.priceProduct;
	var descriptionProduct = req.body.descriptionProduct;

	var idStore = req.params.idStore;
	var idBranch = req.params.idBranch;
	Store.findById({_id: idStore},function(err,store){
		if(err){
			return res.status(400).send({success: false,message: err});
		}
		
		for(var i=0;i<store.branches.length;i++){
			console.log(store.branches[i]);
			if(store.branches[i]._id = idBranch){
				store.branches[i].products.push({nameProduct:nameProduct,priceProduct:priceProduct,descriptionProduct:descriptionProduct});
				Store.update({_id:store._id},store)
					.then(
						function(){
							return res.status(200).send({success: true,store:store})
						}
					)
					.catch(function(){
						return res.status(400).send({success: false,message: err});
					});
			}
		}
	})
}

function getProduct(req,res,next){
	var idStore = req.params.idStore;
	var idBranch = req.params.idBranch;
	var idProduct = req.params.idProduct;

	Store.findById({_id: idStore},function(err,store){
		if(err){
			return res.status(400).send({success: false,message: err});
		}
		
		var branch = store.branches.id(idBranch);
		var product = branch.products.id(idProduct);
		return res.status(200).send({success: true,product: product});
	});
}

var controller = {
	addStore:addStore,
	getStores:getStores,
	infoStore:infoStore,
	addBranch: addBranch,
	getInfoBranch:getInfoBranch,
	addProduct:addProduct,
	getProduct:getProduct
}

module.exports = controller