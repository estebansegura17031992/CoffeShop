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
var controller = {
	addStore:addStore,
	getStores:getStores,
	infoStore:infoStore,
	addBranch: addBranch
}

module.exports = controller