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

var controller = {
	addStore:addStore
}

module.exports = controller