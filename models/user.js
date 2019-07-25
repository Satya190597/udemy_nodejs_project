const db = require('../util/datbase')
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
}
