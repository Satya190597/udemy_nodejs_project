const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const mongodbConnect = require('./util/datbase')
const admin = require('./routes/admin')
const shop = require('./routes/shop')
const user = require('./routes/user')
const mongoose = require('mongoose')

const User = require('./models/user')

const errorController = require('./controllers/error')

const app = express()

/*
    Setting up the template engine
    1. view engine : String which define the installed view-engine
    2. views : A directory or an array of directories for the application's views
 */

app.set('view engine','pug')
app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'images')))


/* Get a particular user for every request */

app.use((request,response,next) => {
    /*
        --- Mongoose ---
    */
    User.findById('5d4ae000a0b8674a60b02719')
    .then(user => {
        request.user = user
        next()
    })
    .catch((error) => {
        console.log('Unable To Set Error In Request '+error)
    })
})


app.use('/admin',admin)
// app.use('/user',user)
app.use(shop)

app.use(errorController.get404)

const connectionUrl = 'mongodb+srv://satya_read_write:6RdrkutxX1Q6FtvI@cluster0-zokmm.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connectionUrl,{useNewUrlParser: false})
.then(result => {
    User.findOne()
    .then(user => {
        console.log(">>>"+user)
        if(!user)
        {
            const newUser = new User({
                name : 'Satya Prakash Nandy',
                email : 'nandy@yahoo.in',
                cart : {items:[]}
            })
            return newUser.save()
        }
        return user
    })
    .then(user => {
        console.log('>>> Current User' + user)
        app.listen(3000)
    })
    .catch(error => {
        console.log('>>> Unable To Create User' + error)
    }) 
})
.catch(error => {
    console.log('Unable To Connect '+error)
})