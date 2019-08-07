const fs = require('fs')
const path = require('path')

const Product = require('../models/product')
const rootPath = require('../util/path')
const file = path.join(rootPath,'data','product.json')

exports.getAddProduct = (request,response) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.status(200).render('admin/edit-product',{title:'Add Product',post:'/admin/add-product',edit:false})
}

exports.postAddProduct = (request,response) => {
    /*
        --- Mongoose ---
    */
    const product = new Product({
        title : request.body.title,
        description : request.body.description,
        price : request.body.price,
        imageUrl : request.body.imageUrl
    })
    product.save()
    .then(product => {
        console.log('Product Create >> '+product)
        response.status(200).redirect('/admin/add-product')
    })
    .catch(error => {
        console.log("Error "+error)
    })  
}

exports.getEditProduct = (request,response) => {
    Product.findById(request.params.productId)
    .then((product) => {
        return response.status(200).render('admin/edit-product',{title:'Edit Product',post:'/admin/edit-product',product:product,edit:true})
    })
    .catch((error) => {
        console.log('Error '+error)
        return response.redirect('admin/products')
    })
}

exports.postEditProduct = (request,response) => {
    const product = new Product(request.body.id,request.body.title,request.body.price,request.body.description,request.body.imageUrl,request.user._id)
    product.save()
    response.status(200).redirect(`/admin/edit-product/${request.body.id}`)
}

exports.deleteProduct = (request,response) => {
    Product.deleteById(request.body.id)
    .then((result) => {
        console.log(`\n\n>>> Result ....${result}....`)
        response.redirect('/products')
    })
    .catch(error => {
        console.log(error)
        response.redirect('/products')
    })
    
}

exports.getProduct = (request,response) => {
    /*
        --- Mongoose ---
    */
    Product.find()
    .then(products => {
        response.status(200).render('admin/product-list',{products:products})
    })
    .catch(error => {
        console.log('Uable To Get Products ' + error)
    })
}