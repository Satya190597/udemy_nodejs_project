const express = require('express')

const adminController = require('../controllers/admin')

const route = express.Router()

route.get('/add-product',adminController.getAddProduct)

route.post('/add-product',adminController.postAddProduct)

route.get('/edit-product/:productId',adminController.getEditProduct)

route.post('/edit-product',adminController.postEditProduct)

route.post('/delete-product',adminController.deleteProduct)

route.get('/products')

module.exports = route