const express = require('express')

const path = require('path')

const route = express.Router()


route.get('/add-product',(request,response,next) => {
    response.sendFile(path.join(__dirname,'../','views','admin-product.html'))
})
route.post('/add-product',(request,response,next) => {
    console.log(`Data : ${request.body.title}`)
    response.redirect('/admin/add-product')
})

module.exports = route