const Product = require('../models/product')
const Cart = require('../models/cart')

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
    Cart.getCartItems((cart)=>{
        cart = JSON.parse(cart)
        Product.fetchAll((products) => {
            const cartItems = []
            for(product of products)
            {
                let p = cart.products.find(prod => parseFloat(prod.id) === product.id)
                if(p)
                {
                    cartItems.push({product:product,qty:p.qty})
                }
            }
            response.status(200).render('shop/cart',{title:'Your Cart',cart:cartItems})
        })
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