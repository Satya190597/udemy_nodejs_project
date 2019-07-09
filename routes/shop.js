const express = require('express')

const path = require('path') 

const rootDirectory = require('../util/path')
const admin = require('../routes/admin')

const route = express.Router()

route.get('/',(request,response,next) => {
    // response.sendFile(path.join(rootDirectory,'views','shop.html'))
    response.render('shop',{products:admin.products,title:'Shop'})
})

module.exports = route