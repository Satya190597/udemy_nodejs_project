const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.logIn = (request,response,next) => {
    let message = request.flash('message')
    if(message.length>0)
        message = message[0]
    response.render('auth/login',{
        pageTitle : 'Login',
        message: message,
    })
}

exports.loginUser = (request,response,next) => {
    User.findOne({email:request.body.email}).then(user => {  
        bcrypt.compare(request.body.password,user.password).then(isAuthenticated => {
            if(isAuthenticated)
            {
                request.session.isAuthenticated = isAuthenticated
                request.session.user = user
                return response.redirect('/')
            }
            request.flash('message','Invalid email or password')
            return response.redirect('/auth/login')
        })
        .catch(error => {
            console.log('Unable To Log In ',error)
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
                cart : {items:[]},
                roles : ['user']
            })
            return newUser.save()
        })
        .then(result => {
            return response.redirect('/auth/signup')
        })
        .catch(error => {
            console.log('Unable To Encrypt Password')
        })
    })
    .catch(error => {
        console.log('Unable to start user login process')
    })
}

exports.logOut = (request,response,next) => {
    request.session.destroy()
    response.redirect('/')
}