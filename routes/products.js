
const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const query = require('../queries/productsQueries');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended:false});



router.get('/product/list',query.getAllData);
router.get('/find/product/:id',query.getData)

const productValidator = require('../validation/productValidation')

router.route('/product/crud')
.post(jsonParser,productValidator.productInsertValidate,query.insertData)
.put(jsonParser,productValidator.productUpdateValidate,query.updateData)
.delete(jsonParser,productValidator.productDeleteValidate,query.deleteData)

// const user = [{name:'Jomer'},{name:'Sally'}];
// router.param('id', (req,res,next,val)=> {
//     req.message =user[val];
//     next();
// })


module.exports = router;