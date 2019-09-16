const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login',authController.logIn)

router.post('/login',authController.loginUser)

router.get('/signup',authController.signUp)

router.post('/signup',authController.signUpUser)

module.exports = router