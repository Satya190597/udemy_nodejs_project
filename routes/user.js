const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/create-user',(request,response)=>{
    const user = new User(request.body.username,request.body.email)
    user.save((user)=>{
        console.log(`User created successfully ${user}`)
    })
})
/*
--- Get Cart Item Rouet ---
*/
router.get('/user/get-cart',(request,response) => {
    const user = new User(request.user.name,request.user.email,request.user.cart,request.user._id)
    user.getCart().then((cart) => {
        response.status(200).json(cart)
    })    
})
router.get('/user/:userId',(request,response)=>{
    User.findById(request.params.userId)
    .then((result)=>{
        console.log('>>>> result' + result)
    })
})

/*
---- Add To Cart Feature ----
*/
router.post('/user/add-to-cart',(request,response) => {
    const user = new User(request.user.name,request.user.email,request.user.cart,request.user._id)
    user.addToCart(request.body.id)
    response.render('/products')
})


module.exports = router