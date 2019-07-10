exports.get404 = (request,response) => {
    // response.status(404).sendFile(path.join(rootDirectory,'views','404.html'))
    response.render('404')
}