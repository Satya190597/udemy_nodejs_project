const express = require('express')
const session = require('express-session')

const bodyParser = require('body-parser')
const path = require('path')
const flash = require('connect-flash')

const mongodbConnect = require('./util/datbase')
const admin = require('./routes/admin')
const shop = require('./routes/shop')
const user = require('./routes/user')
const auth = require('./routes/auth')
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
app.use(session({
    secret:'satyanodeapp',
    resave:false,
    saveUninitialized:false,
}))
app.use(flash())
app.use('/admin',admin)
app.use('/user',user)
app.use('/auth',auth)
app.use(shop)

app.use(errorController.get404)

const connectionUrl = 'mongodb+srv://satya_read_write:6RdrkutxX1Q6FtvI@cluster0-zokmm.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(connectionUrl,{useNewUrlParser: false})
.then(result => {
    app.listen(3000)
})
.catch(error => {
    console.log('Unable To Connect '+error)
})