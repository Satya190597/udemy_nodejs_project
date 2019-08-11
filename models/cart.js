const mongoose = require('mongoose')

const Schema = new mongoose.Schema

const cart = new Schema({
    
})

// const fs = require('fs')
// const rootPath = require('../util/path')

// module.exports = class Cart {
//     static addProduct(id,productPrice) {
//         fs.readFile(rootPath+'/data/cart.json',(error,filedata)=>{
//             let cart = {products:[],totalPrice:0}
//             if(!error)
//             {
//                 cart = JSON.parse(filedata)
//             }

//             const similarProductIndex = cart.products.findIndex(product => product.id === id)
//             const similarProduct = cart.products[similarProductIndex]
//             let updatedProduct;
//             if(similarProduct)
//             {
//                 updatedProduct = {...similarProduct}
//                 updatedProduct.qty = updatedProduct.qty + 1;
//                 cart.products = [...cart.products]
//                 cart.products[similarProductIndex] = updatedProduct;
//             }
//             else
//             {
//                 updatedProduct = {id:id,qty:1}
//                 cart.products = [...cart.products,updatedProduct]
//             }
//             cart.totalPrice = cart.totalPrice + parseInt(productPrice);
//             fs.writeFile(rootPath+'/data/cart.json',JSON.stringify(cart),(error) => {
//                 console.log(error)
//             })
//         })
//     }
//     static deleteProduct(id,productPrice)
//     {
//         fs.readFile(rootPath+'/data/cart.json',(error,data)=>{
//             if(!error)
//             {
//                 let cart = JSON.parse(data)
//                 let updatedCartProducts = []
//                 for(let i = 0; i < cart.products.length; i++)
//                 {
//                     if(cart.products[i].id === id)
//                     {
//                         if(cart.products[i].qty>0)
//                         {
//                             cart.products[i].qty = cart.products[i].qty-1
//                             updatedCartProducts.push(cart.products[i])
//                         }
//                     }
//                 }
//                 cart.products = updatedCartProducts
//                 cart.totalPrice = cart.totalPrice - productPrice
//                 fs.writeFile(rootPath+'/data/cart.json',JSON.stringify(cart),(error)=>{})
//             }
//             else
//             {
//                 return
//             }
//         })
//     }
//     // [Get Cart Items]
//     static getCartItems(callback)
//     {
//         fs.readFile(rootPath+'/data/cart.json',(error,data)=>{
//             if(!error)
//             {
//                 callback(data)
//             }
//             else
//             {
//                 callback(null)
//             }
//         })
//     }
// }