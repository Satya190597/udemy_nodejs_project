const User = require('../models/user')

exports.logIn = (request,response,next) => {
    response.render('auth/login',{
        pageTitle : 'Login'
    })
}

exports.signUp = (request,response,next) => {
    response.render('auth/signup',{
        pageTitle: 'Signup'
    })
}

exports.signUpUser = (request,response,next) => {
    User.findOne({email:request.body.email}).then(result => {
        console.log('USER : ',JSON.stringify(result))
        if(result)
            return response.redirect('/auth/signup')
        const newUser = new User({
            email : request.body.email,
            password : request.body.password,
            cart : {items:[]}
        })
        newUser.save().then(result => {
            return response.redirect('/auth/signup')
        })
        .catch(error => {
            console.log('Error: Unable to signup new user ',error)
        })
    })
    .catch(error => {

    })
}