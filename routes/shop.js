const express = require('express')

const shopController = require('../controllers/shop')

const route = express.Router()

route.get('/',shopController.getIndex)

route.get('/products',shopController.getAllProducts)

route.get('/cart',shopController.getCart)

route.get('/checkout',shopController.getCheckout)

module.exports = route