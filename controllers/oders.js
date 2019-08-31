const Order = require('../models/order')

const addOrders = function(request,response)
{
    const newOrder = new Order()
    
    request.user.populate('cart.items.productId')
                .execPopulate()
                .then(user => {
                    newOrder.products = user.cart.items.map( i => { return {product : { ...i.productId._doc},quantity:i.quantity} })
                    newOrder.user.username = user.name
                    newOrder.user.userId = user
                    newOrder.save()
                            .then(result => {
                                response.redirect('/cart')
                            })
                            .catch(error => {

                            }) 
                })
                .catch(error => {
                    console.log('Error' + error)
                })
}

module.exports =  addOrders