const db = require('../util/datbase')
const Product = require('./product')



module.exports = class User 
{
    constructor(username,email,cart,id)
    {
        this.name = username
        this.email = email
        this.cart = cart
        this.id = id
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
    addToCart(productId)
    {
        const mongo = db.getDb()
        // ---> Reference const userItems = [{productId:product,quantity:1}]

        /*
        --- Update User Id ---
        */
        const userItems = [...this.cart.items]
        Product.findById(productId).then((product) => {
            if(product)
            {
                const index = userItems.findIndex(items => {
                    return items.productId.toString() === productId.toString()
                })
                userItems[index].quantity = userItems[index].quantity + 1;
            }
            else
            {
                userItems.push({productId:productId,quantity:1})
            }
            /*
            --- Update user to add cart Items ---
            */
            mongo.collection('users')
            .updateOne({_id:this.id},{$set:{cart : {items:userItems,totalAmount:0}}},(err,data) => {
                if(err)
                    console.log('>>> Error '+err)
                console.log('>>> Data Updated'+data)
            })
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
