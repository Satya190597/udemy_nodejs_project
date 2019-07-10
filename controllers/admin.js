const Product = require('../models/product')

exports.getAddProduct = (request,response) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.status(200).render('admin/admin-product',{title:'Add Product'})
}

exports.postAddProduct = (request,response) => {
    const product = new Product(request.body.title)
    product.save()
    response.status(200).redirect('/admin/add-product')
}