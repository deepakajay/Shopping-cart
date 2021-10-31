var express = require('express');
const {render, route}=require("../app")
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
  console.log("Price is in string or not "+(req.body.Price));
  req.body.Price=parseInt(req.body.Price)

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


router.get("/delete-product/:id",function(req,res){
  let proId=req.params.id
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin')
  })
})

router.get("/edit-product/:id",async function(req,res){
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})

router.post("/edit-product/:id",function(req,res){
  let id=req.params.id
  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect("/admin")
    if(req.files.Image){
      let image=req.files.Image
      image.mv('./public/product-images/'+id+'.jpg')
     
    }
  })
})

module.exports = router;
