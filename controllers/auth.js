const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.logIn = (request,response,next) => {
    response.render('auth/login',{
        pageTitle : 'Login'
    })
}

exports.loginUser = (request,response,next) => {
    User.findOne({email:request.body.email}).then(result => {
        return bcrypt.compare(request.body.password,result.password).then(result => {
            if(result)
            {
                request.session.isLogin = true
                request.session.user = result
                return response.redirect('/')
            }
            return response.redirect('/auth/login')
        })
        .catch(error => {
            console.log('Error : Unable to compare user password ',error)
        })
    })
    .catch(error => {
        console.log('Error : Unable to find user ',error)
    })
}

exports.signUp = (request,response,next) => {
    response.render('auth/signup',{
        pageTitle: 'Signup'
    })
}

exports.signUpUser = (request,response,next) => {
    User.findOne({email:request.body.email}).then(result => {
        if(result)
            return response.redirect('/auth/signup')
        return bcrypt.hash(request.body.password, 12).then(hash => {
            const newUser = new User({
                email : request.body.email,
                password : hash,
                cart : {items:[]}
            })
            newUser.save().then(result => {
                return response.redirect('/auth/signup')
            })
            .catch('Unable to signup user')
        })
        .catch(error => {
            console.log('Unable To Encrypt Password')
        })
    })
    .catch(error => {
        console.log('Unable to start user login process')
    })
}