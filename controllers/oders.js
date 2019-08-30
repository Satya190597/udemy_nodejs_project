const Order = require('../models/order')

const addOrders = function(user)
{
    const newOrder = new Order()

    newOrder.products.product = {...user.cart}
    newOrder.products.quantity = 1
    newOrder.user.username = user.name
    newOrder.user.userId = user
    return newOrder.save()
}

module.exports =  addOrders