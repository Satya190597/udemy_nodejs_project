const mongodb = require('mongodb')
const MongodbClient = mongodb.MongoClient
const connectionUrl = 'mongodb+srv://satya_read_write:gw5qaUEPknFmZt0g@cluster0-zokmm.mongodb.net/test?retryWrites=true&w=majority'

let _db;

exports.connect = (callback) => {
    MongodbClient.connect(connectionUrl).then((client)=>{
        _db = client.db()
        callback(client)   
    }).catch((error)=>{
        console.log(error)
        throw error
    })
}

exports.getDb = () => {
    if(_db)
    {
        return _db
    }
    throw 'No Database Connected...'
}