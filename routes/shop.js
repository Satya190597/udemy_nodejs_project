const express = require('express')

const shopController = require('../controllers/shop')

const productController = require('../controllers/product')

const route = express.Router()

route.get('/',shopController.getIndex)

route.get('/products',shopController.getAllProducts)

route.get('/products/:productId',productController.getProductDetail)

route.get('/cart',shopController.getCart)

route.post('/cart',shopController.addCart)

route.post('/cart-delete',shopController.deleteCartItems)

route.get('/checkout',shopController.getCheckout)

module.exports = route