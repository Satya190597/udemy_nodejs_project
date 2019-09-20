exports.isAuthenticated = (request,response,next) => {
    if(!request.session.isAuthenticated)
        return response.redirect('/auth/login')
    next();
}
exports.isAuthorize = (hasRole) => {
    return (request,response,next) => {
        let authFlag = false
        request.session.user.roles.forEach(function(role){
            if(hasRole.includes(role))
                authFlag = true
        })
        return authFlag ? next() : response.redirect('/auth/login')
    }
}