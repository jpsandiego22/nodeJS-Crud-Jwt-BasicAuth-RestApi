const express = require('express');
const router = express.Router();
const db = require('../database');
const bodyParser = require('body-parser');
const query = require('../queries/productsController');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get('/product/list', (req,res)=>{
    const data = db.query(query.getAllData(),(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success 1',
            data: result
        });
    });
})

router.post('/product/new',jsonParser, function(req,res){
    if (!req.body) throw  res.json({
        status:'failed',
        message: 'Invalid Request'
    });
    const data = db.query(query.insertData(),req.body,(err,result) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            data: result.insertId
        });
    });
})

router.route('/find/product/:id')
.get((req,res)=>{
    const data = db.query(query.getData(),req.params.id,(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            data: result
        });
    });
})
.post(jsonParser,function(req,res){
    const data = db.query(query.getData(),req.params.id,(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            data: result
        });
    });
})

// const user = [{name:'Jomer'},{name:'Sally'}];
// router.param('id', (req,res,next,val)=> {
//     req.message =user[val];
//     next();
// })


module.exports = router;