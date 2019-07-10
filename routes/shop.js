const express = require('express')

const productController = require('../controllers/product')

const route = express.Router()

route.get('/',productController.getAllProducts)

module.exports = route