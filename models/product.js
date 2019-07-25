const mongodb = require('mongodb')
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

    // >>> MongoDb code to add product <<<
    save()
    {
        const mongo = db.getDb()
        return mongo.collection('products').insertOne(this).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
    }
    // >>> End <<

    // >>> MongoDb code to find all products <<<
    static fetchAll(callBack)
    {
        const mongo = db.getDb()
        mongo.collection('products')
        .find()
        .toArray()
        .then((products)=>{
            callBack(products)
        }).catch((error)=>{
            throw error
        })
    }
    // >>> End <<<

    // >>> MongoDb code to find a particular product <<<
    static findById(id)
    {
        const mongo = db.getDb()
        return mongo.collection('products')
        .find({_id:new mongodb.ObjectID(id)})
        .next()
        .then((product) => {
            return product
        })
        .catch((error) => {
            console.log('Error '+error+' Id '+id)
            throw error
        })
    }
    // >>> End <<

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