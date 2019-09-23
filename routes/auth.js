const express = require('express')

const { body } = require('express-validator')

const router = express.Router()

const authController = require('../controllers/auth')

router.get('/login',authController.logIn)

router.get('/logout',authController.logOut)

router.post('/login',[body('email','Please enter a valid email').isEmail(),body('password','Password must be 5 character long').isLength({min:5})],authController.loginUser)

router.get('/signup',authController.signUp)

router.post('/signup',authController.signUpUser)

module.exports = router