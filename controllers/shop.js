const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getAllProducts = (request,response) => {
    // response.sendFile(path.join(rootDirectory,'views','shop.html'))
    Product.fetchAll((products) => {
        response.status(200).render('shop/product-list',{products:products,title:'Shop'})
    })
    
}

exports.getIndex = (request,response) => {
    Product.fetchAll((products) => {
        response.status(200).render('shop/index',{products:products,title:'Shop'})
    })
}

exports.getCart = (request,response) => {
    response.status(200).render('shop/cart',{title:'Your Cart'})
}

exports.addCart = (request,response) => {
    console.log(request.body.id)
    Cart.addProduct(request.body.id,request.body.price)
    response.redirect('/')
}

exports.getCheckout = (request,response) => {
    response.status(200).render('shop/checkout',{title:'Checkout'})
}