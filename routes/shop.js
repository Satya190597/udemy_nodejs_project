const express = require('express')

const path = require('path') 

const rootDirectory = require('../util/path')

const route = express.Router()

route.get('/',(request,response,next) => {
    response.sendFile(path.join(rootDirectory,'views','shop.html'))
})

module.exports = route