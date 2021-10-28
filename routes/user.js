var express = require('express');
var router = express.Router();
const productHelpers = require('../helpers/product-helpers');
/* GET home page. */
router.get('/', function(req, res, next) {
  productHelpers.getAllproducts().then(function(products){
    console.log(products);
    
    res.render('user/view-products',{admin:false,products})
  })
});

module.exports = router;
