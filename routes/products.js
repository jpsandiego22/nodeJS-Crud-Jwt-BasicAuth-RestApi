const express = require('express');
const router = express.Router();
const db = require('../database');
const bodyParser = require('body-parser');
const query = require('../queries/productsQueries');

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended:false});

router.get('/product/list', (req,res)=>{
    const data = db.query(query.getAllData(),(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            data: result
        });
    });
})
router.get('/find/product/:id', (req,res)=>{
    db.query(query.getData(),req.params.id,(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            data: result
        });
    });
})

router.route('/product/crud')
.post(jsonParser,(req,res)=>{
    if (!req.body) throw  res.json({
        status:'failed',
        message: 'Invalid Request'
    });
    db.query(query.insertData(),req.body,(err,result) => {
        if (err) throw res.send(err);
        db.query(query.getData(),result.insertId,(error,results,fields) => {
            if (error) throw res.send(error);
            res.json({
                status:'success',
                message:'New Product successfully added.',
                data: results
            });
        });
    });
})
.put(jsonParser,(req,res)=>{
    if (!req.body) throw  res.json({
        status:'failed',
        message: 'Invalid Request'
    });
    const data = req.body;
    db.query(query.updateData(),[data.name,data.category,data.description,data.id],(err,result,fields) => {
        if (err) throw res.send(err);
        db.query(query.getData(),data.id,(error,results,fields) => {
            if (error) throw res.send(error);
            res.json({
                status:'success',
                message:'Record has been updated.',
                data: results
            });
        });
    });
})
.delete(jsonParser,(req,res)=>{
    if (!req.body) throw  res.json({
        status:'failed',
        message: 'Invalid Request'
    });
    const data = req.body;
    db.query(query.deleteData(),[data.id],(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            message:'Record has been deleted.',
        });
    });
})





// const user = [{name:'Jomer'},{name:'Sally'}];
// router.param('id', (req,res,next,val)=> {
//     req.message =user[val];
//     next();
// })


module.exports = router;