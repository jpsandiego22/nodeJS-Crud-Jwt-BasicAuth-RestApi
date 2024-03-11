const db = require('../database');
const singlequery = 'SELECT * FROM products where id= ?';
const getAllData = async(req,res)=>{
    const query = 'SELECT * FROM products';
    db.query(query,(err,result,fields) => {
        if (err) throw res.send(err);
        res.json({
            status:'success',
            data: result
        });
    });
}
const getData = async(req,res)=>{
    const query = 'SELECT * FROM products where id= ?';
    db.query(query,req.params.id,(err,result,fields) => {
        if (err) throw res.send(err);
        if(!result.length) return res.json({status:'failed',message: 'No record Found.'});

        res.json({
            status:'success',
            data: result
        });
    });
}

const insertData = async(req,res)=>{
    const query = 'INSERT INTO products SET ?';


    try {
        db.query(query,req.body,(err,result) => {
            if (err) throw res.send(err);
            db.query(singlequery,result.insertId,(error,results,fields) => {
                if (error) throw res.send(error);
                res.json({
                    status:'success',
                    message:'New Product successfully added.',
                    data: results
                });
            });
        });
    } catch (error) {
        console.log(error)
    }
}

const updateData = async(req,res)=>{
    const query = 'UPDATE products set name=?, category=?, description=? where id=?';
    
    const data = req.body;
    try {
        db.query(singlequery,data.id,(error,results,fields) => {
            if (error) throw res.send(error);
            if(!results.length) return  res.json({
                status:'success',
                message:'No record found in this ID: '+ data.id,
                // data: results
            });
            db.query(query,[data.name,data.category,data.description,data.id],(err,result) => {
            if (err) throw res.send(err);
                res.json({
                    status:'success',
                    message:'Record has been updated.',
                    // data: result
                });
            });
        });
    } catch (error) {
        console.log(error)
    }
} 
const deleteData = async(req,res)=>{
    const query = 'Delete from products where id=?';
    const data = req.body;
    try {
        db.query(query,[data.id],(err,result,fields) => {
            if (err) throw res.send(err);
            res.json({
                status:'success',
                message:'Record has been deleted.',
            });
        });
    } catch (error) {
        console.log(error)
    }
} 

module.exports = {
    getAllData,
    getData,
    insertData,
    updateData,
    deleteData
  };
  


  







