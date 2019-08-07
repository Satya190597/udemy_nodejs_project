/*
    Import Modules
    1. Mongoose
*/
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema({
    title : {
        type: String,
        require: true
    },
    description : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    imageUrl : {
        type : String,
        require : true
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
})

/*
    Exports
    1. Product Schema
*/
module.exports = mongoose.model('Product',product)