const fs = require('fs')
const rootPath = require('../util/path')

module.exports = class Cart {
    static addProduct(id,productPrice) {
        fs.readFile(rootPath+'/data/cart.json',(error,filedata)=>{
            let cart = {products:[],totalPrice:0}
            if(!error)
            {
                cart = JSON.parse(filedata)
            }

            const similarProductIndex = cart.products.findIndex(product => product.id === id)
            const similarProduct = cart.products[similarProductIndex]
            let updatedProduct;
            if(similarProduct)
            {
                updatedProduct = {...similarProduct}
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]
                cart.products[similarProductIndex] = updatedProduct;
            }
            else
            {
                updatedProduct = {id:id,qty:1}
                cart.products = [...cart.products,updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + parseInt(productPrice);
            fs.writeFile(rootPath+'/data/cart.json',JSON.stringify(cart),(error) => {
                console.log(error)
            })
        })
    }
}