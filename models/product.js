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
                this.id = parseFloat(this.id)
                let productIndex = products.findIndex(p => p.id === this.id)
                products[productIndex] = this
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
    static deleteById(id)
    {
        readProductFile((products)=>{
            const productList = products.filter(p => p.id!==id)
            fs.writeFile(file,JSON.stringify(productList),(error) => {
                if(error)
                    console.log(`Write File Error : ${error}`)
                    
                
            })
        })
    }
}