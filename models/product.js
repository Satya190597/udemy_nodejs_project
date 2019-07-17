const fs = require('fs')
const path = require('path')

const rootDirectory = require('../util/path')

const file = path.join(rootDirectory,'data','product.json')

const readProductFile = (callBack) => {
    let file = path.join(rootDirectory,'data','product.json')
    fs.readFile(file,(error,data) => {
        if(error)
        {
            callBack([])
        }
        callBack(JSON.parse(data))
    })
}

module.exports = class Product{
    constructor(id,title,price,description,imageUrl)
    {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.imageUrl = imageUrl
    }
    save()
    {
        readProductFile((products) => {
            if(this.id)
            {
                let productIndex = products.findIndex(p => p.id === parseFloat(this.id))
                products[productIndex].title = this.title
                products[productIndex].description = this.description
                products[productIndex].price = this.price
                products[productIndex].imageUrl = this.imageUrl
            }
            else
            {
                this.id = Math.random()
                products.push(this)
            }
            fs.writeFile(file,JSON.stringify(products),(error) => {
                if(error)
                    console.log(`Write File Error : ${error}`)
            })
        })
    }
    static fetchAll(callBack)
    {
        readProductFile(callBack)
    }
}