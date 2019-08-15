const express = require('express')
const router = express.Router()

const User = require('../models/user')

// router.post('/create-user',(request,response)=>{
//     const user = new User(request.body.username,request.body.email)
//     user.save((user)=>{
//         console.log(`User created successfully ${user}`)
//     })
// })
// /*
// --- Add Order ---
// */
// router.get('/user/add-order',(request,response) => {
//     const user = new User(request.user.name,request.user.email,request.user.cart,request.user._id)
//     user.addOrders().then((result) => {
//         response.status(200).json(result)
//     })    
// })

// /*
// --- Get Cart Item Rouet ---
// */
// router.get('/user/get-cart',(request,response) => {
//     const user = new User(request.user.name,request.user.email,request.user.cart,request.user._id)
//     user.getCart().then((cart) => {
//         response.status(200).json(cart)
//     })    
// })

// /*
// --- Delete Cart Item ---
// */
// router.post('/user/delete-cart',(request,response) => {
//     const user = new User(request.user.name,request.user.email,request.user.cart,request.user._id)
//     user.deleteCartItems(request.body.id).then((data) => {
//         response.status(200).json(data)
//     })
// })

// router.get('/user/:userId',(request,response)=>{
//     User.findById(request.params.userId)
//     .then((result)=>{
//         console.log('>>>> result' + result)
//     })
// })

/*
---- Add To Cart Feature ----
*/
router.post('/user/add-to-cart',(request,response) => {
    request.user.addToCart(request.body.id).then(result => {
        response.redirect('/cart')
    })
})
/*
---- Add Order ----
*/
router.post('/add-product',(request,response) => {
    let products = [] 
    products = request.user
    .populate("cart.items.productId")
    .execPopulate()
    .cart
    .items
    .map(items => {
        return {product:{...items.productId._doc},quantity:items.quantity}
    })
    console.log("Products : "+JSON.stringify(products))
})

module.exports = router