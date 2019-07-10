const fs = require('fs')
const path = require('path')

const rootDirectory = require('../util/path')

module.exports = class Product{
    constructor(title)
    {
        this.title = title
    }
    save()
    {
        let file = path.join(rootDirectory,'data','product.json')
        fs.readFile(file,(error,data) => {
            let products = []
            if(!error)
            {
                products = JSON.parse(data)
            }
            products.push(this)
            fs.writeFile(file,JSON.stringify(products),(error) => {
                if(error)
                    console.log(`Write File Error : ${error}`)
            })
        })
    }
    static fetchAll(callBack)
    {
        let file = path.join(rootDirectory,'data','product.json')
        fs.readFile(file,(error,data) => {
            if(error)
            {
                callBack([])
            }
            callBack(JSON.parse(data))
        })
    }
}