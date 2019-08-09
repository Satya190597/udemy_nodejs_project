const Product = require('../models/product')
const Cart = require('../models/cart')
const User = require('../models/user')

exports.getAllProducts = (request,response) => {
    /*
        --- Mongoose ---
    */
    Product.find()
    .then(products => {
        response.status(200).render('shop/product-list',{products:products,title:'Shop'})
    })
    .catch(error => {
        console.log('Unable To Get Products' + error)
    })
}

exports.getIndex = (request,response) => {
   /*
        --- Mongoose ---
    */
   Product.find()
   .then(products => {
       response.status(200).render('shop/product-list',{products:products,title:'Shop'})
   })
   .catch(error => {
       console.log('Unable To Get Products' + error)
   })
}

exports.getCart = (request,response) => {

    //---- Mongoose ----
    User.findById(request.user)
    .select('cart')
    .populate('cart.items.productId')
    .exec()
    .then(cart => {
        console.log('Cart >> '+cart.cart.items)
        response.status(200).render('shop/cart',{title:'Your Cart',cart:cart.cart.items})
    })
    .catch(error => {
        console.log('Error '+error)
    })
}

exports.addCart = (request,response) => {
    console.log(request.body.id)
    Cart.addProduct(request.body.id,request.body.price)
    response.redirect('/')
}

exports.getCheckout = (request,response) => {
    response.status(200).render('shop/checkout',{title:'Checkout'})
}

exports.deleteCartItems = (request,response) => {
    Cart.deleteProduct(request.body.id,parseInt(request.body.price))
    response.redirect('/')
}