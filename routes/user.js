const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.post('/create-user',(request,response)=>{
    const user = new User(request.body.username,request.body.email)
    user.save((user)=>{
        console.log(`User created successfully ${user}`)
    })
})

router.get('/user/:userId',(request,response)=>{
    User.findById(request.params.userId)
    .then((result)=>{
        console.log('>>>> result' + result)
    })
})

module.exports = router