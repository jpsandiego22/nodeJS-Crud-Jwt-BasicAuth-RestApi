module.exports = {
    getAllData: function () {
        return 'SELECT * FROM products';
    },
    getData: function () {
        return 'SELECT * FROM products where id= ?';
    },
    insertData: function () {
        return 'INSERT INTO products SET ?';
    }
  };
  







