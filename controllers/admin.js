const Product = require('../models/product')

exports.getAddProduct = (request,response) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.status(200).render('admin/edit-product',{title:'Add Product',post:'/admin/add-product',edit:false})
}

exports.postAddProduct = (request,response) => {
    const product = new Product(request.body.title,request.body.price,request.body.description,request.body.imageUrl)
    product.save()
    response.status(200).redirect('/admin/add-product')
}

exports.getEditProduct = (request,response) => {
    const productId = request.params.productId
    Product.fetchAll((products) => {
        for(let i = 0; i < products.length; i++)
        {
            if(products[i].id===parseFloat(productId))
            {   
                return response.status(200).render('admin/edit-product',{title:'Edit Product',post:'/admin/edit-product',product:products[i],edit:true})
            }
        }
        return response.status(200).render('admin/edit-product',{title:'Add Product',post:'/admin/add-product',edit:true})
    })
    
}