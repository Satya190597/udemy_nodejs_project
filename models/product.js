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
        let dbOperation = this.id ? mongo.collection('products').updateOne({_id: new mongodb.ObjectID(this.id)},{$set:this}) : mongo.collection('products').insertOne(this)
        return dbOperation
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => {
            console.log(error)
            throw error
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

    // >>> MongoDb code to delete a particular product <<<
    static deleteById(id)
    {
        const mongo = db.getDb()
        return mongo.collection('products')
        .deleteOne({_id:new mongodb.ObjectID(id)})
        .then(result => {
            console.log(result)
            return result
        })
        .catch(result => {
            throw error
        })
    }
    // >>> End <<
}