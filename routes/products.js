
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const {getData,getAllData,insertData,updateData,deleteData} = require('../queries/productsQueries');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended:false});



router.get('/product/list',getAllData);
router.get('/find/product/:id',getData)

const {productInsertValidate,productUpdateValidate,productDeleteValidate} = require('../validation/productValidation')

router.route('/product/crud')
.post(jsonParser,productInsertValidate,insertData)
.put(jsonParser,productUpdateValidate,updateData)
.delete(jsonParser,productDeleteValidate,deleteData)

// const user = [{name:'Jomer'},{name:'Sally'}];
// router.param('id', (req,res,next,val)=> {
//     req.message =user[val];
//     next();
// })


module.exports = router;