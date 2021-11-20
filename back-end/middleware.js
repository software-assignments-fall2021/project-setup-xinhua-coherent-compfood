const jwt = require('jsonwebtoken');


var verify = function(req, res, next){
    let accessToken = req.cookies.jwt

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.render('error')
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        next()
    }
    catch(e){
        //if an error occured return request unauthorized error
        let message = 'Token has expired, please login again'
        return res.render('error', {message: message})
    }
}
module.exports = {
    verify: verify
}