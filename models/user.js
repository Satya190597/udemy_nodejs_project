const mongoose = require('mongoose')

const Schema = mongoose.Schema

const user = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    cart : {
        items : [{
            productId : {
                type: Schema.Types.ObjectId,
                required:true,ref:'Product'
            },
            quantity : {
                type : Number,
                require : true
            }
        }]
    }
})
/*
    --- Custom Methods ---
*/
user.methods.addToCart = function (product){
    /*
        1. Get user cart information
        2. Check If Product Exist Or Not
        3. If Exist Increment The Quantity
        4. If Not Add The New Element
    */    
   console.log(user)
   console.log(this.cart)
   const userCartItems = [...this.cart.items]
   const productIndex = userCartItems.findIndex( items => { return items.productId.toString() === product})
   if(productIndex>-1)
   {
       userCartItems[productIndex].quantity = userCartItems[productIndex].quantity + 1;
   }
   else
   {
       userCartItems.push({productId:product,quantity:1})
   }
   this.cart.items = userCartItems
   return this.save()
}

user.methods.deleteItemsFromCart = function(id){
    /*
        1. Get user cart items
        2. Filter cart items removing the product
        3. Update the cart
    */
    const updatedCart = this.cart.items.filter( items => {
        return items._id.toString()!=id
    })
    this.cart.items = updatedCart
    return this.save()
    .then(user => {
        return user;
    })
    .catch(error => {
    console.log('Unable to remove item from cart '+error)
    })
}

user.methods.clearCartItems = function()
{
    /*
        Note : Empty the cart item by updating an empty cart object.
    */
    this.cart = {items:[]}
    return this.save()
}



module.exports = mongoose.model('User',user)
