const fs = require('fs')
const path = require('path')
const db = require('../util/datbase')

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
        // readProductFile((products) => {
        //     if(this.id)
        //     {
        //         this.id = parseFloat(this.id)
        //         let productIndex = products.findIndex(p => p.id === this.id)
        //         products[productIndex] = this
        //     }
        //     else
        //     {
        //         this.id = Math.random()
        //         products.push(this)
        //     }
        //     fs.writeFile(file,JSON.stringify(products),(error) => {
        //         if(error)
        //             console.log(`Write File Error : ${error}`)
        //     })
        // })
        
        // ---------------- MongoDb code to add product ----------------
        const mongo = db.getDb()
        return mongo.collection('products').insertOne(this).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
        // ---------------- End ----------------
    }
    static fetchAll(callBack)
    {
        const mongo = db.getDb()
        mongo.collection('products').find().toArray().then((products)=>{
            callBack(products)
        }).catch((error)=>{
            throw error
        })
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