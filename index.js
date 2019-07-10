const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const admin = require('./routes/admin')
const shop = require('./routes/shop')
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

app.use('/admin',admin)
app.use(shop)

app.use(errorController.get404)

app.listen(3000)