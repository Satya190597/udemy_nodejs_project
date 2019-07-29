const db = require('../util/datbase')
const mongodb = require('mongodb')
module.exports = class User 
{
    constructor(username,email)
    {
        this.name = username
        this.email = email
    }
    save(callback)
    {
        const mongo = db.getDb()
        mongo.collection('users')
        .insertOne(this)
        .then((result) => {
            callback(result)
        })
        .catch((error) => {
            throw(error)
        })
    }
    static findById(id)
    {
        const mongo = db.getDb()
        return mongo.collection('users')
        .findOne({_id:new mongodb.ObjectID(id)})
        .then((user) => {
            return user
        })
        .catch((error) => {
            console.log('Error '+error+' Id '+id)
            throw error
        })
    }
}
