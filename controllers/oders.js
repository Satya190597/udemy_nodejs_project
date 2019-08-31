const Order = require('../models/order')

exports.addOders = function(request,response){
    const newOrder = new Order()
    
    request.user.populate('cart.items.productId')
                .execPopulate()
                .then(user => {
                    newOrder.products = user.cart.items.map( i => { return {product : { ...i.productId._doc},quantity:i.quantity} })
                    newOrder.user.username = user.name
                    newOrder.user.userId = user
                    newOrder.save()
                            .then(result => {
                                request.user.clearCartItems()
                                            .then(result => {
                                                console.log('\n[ Updated Empty Cart ' + result + ']')
                                                response.redirect('/cart')
                                            })
                                            .catch(error => {
                                                console.log('Error ' + error)
                                            })
                            })
                            .catch(error => {
                                console.log('Error '+error)
                            }) 
                })
                .catch(error => {
                    console.log('Error' + error)
                })
}

exports.getOders = function(request,response){
    Order.find({'user.userId':request.user}).then(result => {
        console.log('\n[ Oders : ' + result + ' ]')
        return response.render('oders/oders',{oders:result,pageTitle:'Oders'})
    })
    .catch(error => {
        console.log('\nError : Unable to get oders '+ error)
        return response.render('oders/oders',{oders:[],pageTitle:'Oders'})
    })
}