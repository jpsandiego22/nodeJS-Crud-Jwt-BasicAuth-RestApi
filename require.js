
module.exports = function() {
    const express = require('express');
    const router = express.Router();
    const db = require('../database');
    const bodyParser = require('body-parser');
    const query = require('../queries/productsController');

    const jsonParser = bodyParser.json();
    const urlencodedParser = bodyParser.urlencoded({extended:false});
}