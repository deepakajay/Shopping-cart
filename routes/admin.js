var express = require('express');
const {render}=require("../app")
var router = express.Router();
var productHelper=require("../helpers/product-helpers")
const fileUpload = require('express-fileupload');
const productHelpers = require('../helpers/product-helpers');
/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllproducts().then(function(products){
    console.log(products);
    res.render('admin/view-products',{admin:true,products})
  })
  
});

router.get("/add-product",function(req,res){
  res.render('admin/add-product')
})

router.post("/add-product",function(req,res){
  console.log(req.body);
  console.log(req.files.Image);

  productHelpers.addProduct(req.body,function(id){
    let image=req.files.Image;
    console.log(id);
    image.mv('./public/product-images/'+id+'.jpg',function(err,done){
      if(!err){
        res.render('admin/add-product')
      }
      else{
        console.log(err);
      }
    })
    
  })
})

module.exports = router;
