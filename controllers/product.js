const Product = require('../models/product')

exports.getAddProduct = (request,response) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.status(200).render('admin/admin-product',{title:'Add Product'})
}

exports.getAllProducts = (request,response) => {
    // response.sendFile(path.join(rootDirectory,'views','shop.html'))
    Product.fetchAll((products) => {
        response.status(200).render('shop/product-list',{products:products,title:'Shop'})
    })
    
}

exports.getProductDetail = (request,response) => {
    /*
        --- Mongoose ---
    */
    Product.findById(request.params.productId)
    .then(product => {
        return response.render('shop/product-detail',{product:product})
    })
    .catch(error => {
        console.log(error)
        return response.render('shop/product-detail',{product:[]})
    })

}