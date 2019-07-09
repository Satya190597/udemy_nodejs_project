const express = require('express')

const path = require('path') 

const rootDirectory = require('../util/path')
const admin = require('../routes/admin')

const route = express.Router()

route.get('/',(request,response,next) => {
    console.log(`>>> ${JSON.stringify(admin.products)} <<<`)
    // response.sendFile(path.join(rootDirectory,'views','shop.html'))
    response.render('shop')
})

module.exports = route