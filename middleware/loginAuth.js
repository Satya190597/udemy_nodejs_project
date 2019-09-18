exports.isAuthenticated = (request,response,next) => {
    if(!request.session.isAuthenticated)
        return response.redirect('/auth/login')
    next();
}