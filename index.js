const express = require('express')

const bodyParser = require('body-parser')
const path = require('path')

const admin = require('./routes/admin')
const shop = require('./routes/shop')
const rootDirectory = require('./util/path')

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin',admin)
app.use(shop)

app.use((request,response) => {
    response.status(404).sendFile(path.join(rootDirectory,'views','404.html'))
})

app.listen(3000)