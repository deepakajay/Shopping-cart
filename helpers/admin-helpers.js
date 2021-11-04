var db=require("../config/connection");
var collection=require("../config/collections");
var objectId = require('mongodb').ObjectID
const bcrypt=require('bcrypt');
const { response } = require("express");
const collections = require("../config/collections");
var objectId=require("mongodb").ObjectId;
const { ObjectId } = require("mongodb");

module.exports={
    doLogin:function(adminData){
        return new Promise(async function(resolve,reject){
            let loginStatus=false;
            let response={};
            let admin=await db.get().collection(collection.ADMIN_COLLECTION).findOne({Email:adminData.Email})
            if(admin){
                bcrypt.compare(adminData.Password,admin.Password).then((status)=>{
                    if(status){
                        console.log("Login Success");
                        response.admin=admin;
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