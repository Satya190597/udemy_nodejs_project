const products = []

exports.getAddProduct = (request,response) => {
    // response.status(200).sendFile(path.join(rootDirectory,'views','admin-product.html'))
    response.status(200).render('admin-product',{title:'Add Product'})
}

exports.postAddProduct = (request,response) => {
    products.push({title:request.body.title})
    response.status(200).redirect('/admin/add-product')
}

exports.getAllProducts = (request,response) => {
    // response.sendFile(path.join(rootDirectory,'views','shop.html'))
    response.status(200).render('shop',{products:products,title:'Shop'})
}