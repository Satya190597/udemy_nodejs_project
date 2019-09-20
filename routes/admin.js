const express = require('express')

const adminController = require('../controllers/admin')

const authentication = require('../middleware/loginAuth')

const route = express.Router()

route.get('/add-product',authentication.isAuthenticated,authentication.isAuthorize(['admin']),adminController.getAddProduct)

route.post('/add-product',adminController.postAddProduct)

route.get('/edit-product/:productId',adminController.getEditProduct)

route.post('/edit-product',adminController.postEditProduct)

route.post('/delete-product',adminController.deleteProduct)

route.get('/products',adminController.getProduct)

module.exports = route