const express = require('express')

const path = require('path')

const rootDirectory = require('../util/path')

const route = express.Router()

const products = []

route.get('/add-product',(request,response,next) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.render('admin-product')
})
route.post('/add-product',(request,response,next) => {
    // console.log(`Data : ${request.body.title}`)
    products.push({title:request.body.title})
    response.status(200).redirect('/admin/add-product')
})

exports.route = route
exports.products = products