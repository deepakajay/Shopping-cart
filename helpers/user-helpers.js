var db=require("../config/connection");
var collection=require("../config/collections");
var objectId = require('mongodb').ObjectID
const bcrypt=require('bcrypt');
const { response } = require("express");


module.exports={
    doSignup:function(userData){
        return new Promise(async function(resolve,reject){
            userData.Password=await bcrypt.hash(userData.Password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
              resolve(data.insertedId)  
            })

        })
       
    },
    doLogin:function(userData){
        return new Promise(async function(resolve,reject){
            let loginStatus=false;
            let response={};
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({Email:userData.Email})
            if(user){
                bcrypt.compare(userData.Password,user.Password).then((status)=>{
                    if(status){
                        console.log("Login Success");
                        response.user=user;
                        response.status=true;
                        console.log("Responce contains: "+response);
                        resolve(response)
                    }else{
                        console.log("Login Failed");
                        resolve({status:false})
                    }
                })
            }
            else{
                console.log("Login Failed user does not exist");
               resolve({status:false})
            }
        })
    }
}