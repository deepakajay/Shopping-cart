var db=require("../config/connection")


module.exports={
    addProduct:function(product,callback){
        console.log(product);
        db.get().collection('product').insertOne(product).then(function(data){
            callback(data.insertedId)
        })
    }
}