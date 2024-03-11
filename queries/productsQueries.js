module.exports = {
    getAllData: function () {
        return 'SELECT * FROM products';
    },
    getData: function () {
        return 'SELECT * FROM products where id= ?';
    },
    insertData: function () {
        return 'INSERT INTO products SET ?';
    },
    updateData: function () {
        return 'UPDATE products set name=?, category=?, description=? where id=?';
    },
    deleteData: function () {
        return 'Delete from products where id=?';
    }
  };
  







