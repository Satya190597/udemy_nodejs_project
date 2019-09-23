/*
    Import Modules
    1. Mongoose
*/
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const product = new Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    imageUrl : {
        type : String,
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