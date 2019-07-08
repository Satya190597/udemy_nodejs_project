const express = require('express')

const path = require('path') 

const route = express.Router()

route.get('/',(request,response,next) => {
    response.sendFile(path.join(__dirname,'../','views','shop.html'))
})

module.exports = route