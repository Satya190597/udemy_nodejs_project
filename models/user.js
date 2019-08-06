const mongodb = require('mongodb')
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
        const userItems = this.cart.items ? [...this.cart.items] : []
        Product.findById(productId).then((product) => {
            if(userItems.length>0)
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
    /*
    -- Get Cart Functionality --
    */
    getCart()
    {
        // --- Get Connection ---
        const mongo = db.getDb();

        // --- Get Products Ids From User Cart ---
        const productIds = this.cart.items.map( item => {
            return mongodb.ObjectId(item.productId)
        })

        // --- Get Full product details from productIds ---

        return mongo.collection('products')
        .find({_id:{$in:productIds}})
        .toArray()
        .then(product => {
            return product.map(p => {
                return {
                    ...p,
                    quantity: this.cart.items.find(item => {
                        return item.productId.toString() === p._id.toString()
                    }).quantity
                }
            })
        })
    }
    /*
    --- Delete Cart Item ---
    */
    deleteCartItems(productId)
    {
        // --- Call Connection ---
        const mongo = db.getDb()

        // --- Filter Out The Deleted Product From Cart ---
        const updatedCart = this.cart.items.filter(product => {
            return product.productId.toString() !== productId.toString()
        })
        
        // --- Update User With New Cart Item ---
        return mongo.collection('users')
        .updateOne({_id:this.id},{$set:{cart:updatedCart}})
        .then(data => {
            return data
        })
    }
    /*
    --- Add Orders ---
    */
    addOrders()
    {
        // Step 1:  Call Connection 
        // Step 2:  Get Cart Items 
        // Step 3:  Add Product
        // Step 4:  Empty The Cart

        const mongo = db.getDb() 

        return this.getCart().then(product => {
            const cart = {
                product : product,
                user : {
                    name: this.name,
                    id: this.id
                }
            }
            return mongo.collection('orders')
            .insertOne(cart)
            .then(data => {
                const emptyCart = {items:[],totalAmount:0}
                return mongo.collection('users')
                .updateOne({_id:new mongodb.ObjectID(this.id)},{$set:{cart:emptyCart}})
                .then(result => {
                    return result;
                })
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
