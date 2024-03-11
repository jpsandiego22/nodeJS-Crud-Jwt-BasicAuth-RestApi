const productInsertValidate = async(req,res,next)=>{
    const data = req.body;
    if(!data.name || !data.category || !data.description)  throw res.json({
        status:'failed',
        message: 'Incomplete Parameters'
    });
    next();
}
const productUpdateValidate = async(req,res,next)=>{
    const data = req.body;
    if(!data.name || !data.category || !data.description || !data.id)  throw res.json({
        status:'failed',
        message: 'Incomplete Parameters'
    });
    next();
}

const productDeleteValidate = async(req,res,next)=>{
    const data = req.body;
    if(!data.id)  throw res.json({
        status:'failed',
        message: 'Incomplete Parameters'
    });
    next();
}

module.exports = {
    productInsertValidate,
    productUpdateValidate,
    productDeleteValidate
}
// module.exports = {
//     getAllDataValidation: function (data, next) {
//         return 'SELECT * FROM products';
//     },
//     getDataValidation: function (data) {
//         return 'SELECT * FROM products where id= ?';
//     },
//     insertDataValidation: function (data, next) {
        
//     },
//     updateDataValidation: function (data, next) {
//         return 'UPDATE products set name=?, category=?, description=? where id=?';
//     },
//     deleteDataValidation: function (data, next) {
//         return 'Delete from products where id=?';
//     }
//   };