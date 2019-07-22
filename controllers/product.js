const Product = require('../models/product')

exports.getAddProduct = (request,response) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.status(200).render('admin/admin-product',{title:'Add Product'})
}

// --- This feature is added in admin controller --
// exports.postAddProduct = (request,response) => {
//     const product = new Product(null,request.body.title,request.body.price,request.body.description,request.body.imageUrl)
//     product.save()
//     response.status(200).redirect('/admin/add-product')
// }

exports.getAllProducts = (request,response) => {
    // response.sendFile(path.join(rootDirectory,'views','shop.html'))
    Product.fetchAll((products) => {
        response.status(200).render('shop/product-list',{products:products,title:'Shop'})
    })
    
}

exports.getProductDetail = (request,response) => {

    const productId = request.params.productId

    Product.fetchAll((products) => {
        for(let i = 0; i<products.length; i++)
        {
            if(products[i].id == productId)
                return response.render('shop/product-detail',{product:products[i]})
        }
        return response.render('shop/product-detail',{product:[]})
    })
}