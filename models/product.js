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
    constructor(title,description,price,imageUrl)
    {
        this.title = title
        this.description = description
        this.price = price
        this.imageUrl = imageUrl
    }
    save()
    {
        readProductFile((products) => {
            products.push(this)
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