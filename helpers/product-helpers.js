var db=require("../config/connection")
var collection=require("../config/collections")
var objectId=require("mongodb").ObjectId

module.exports={
    addProduct:function(product,callback){
        console.log(product);
        db.get().collection('product').insertOne(product).then(function(data){
            callback(data.insertedId)
        })
    },
    getAllproducts:function(){
        return new Promise(async function(resolve,reject){
            let products=await  db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
            resolve(products)
        })
    },
        deleteProduct:function(proId){
        return new Promise(function(resolve,reject){
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then(function(response){
                // console.log(response);
                resolve(response)
            })
        })
    }
}