const jwt = require("jsonwebtoken");

exports.verify = function(req, res, next){
    const accessToken = req.cookies.jwt;

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send('Acesss Denied');
    }

    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET, {expiresIn: '1h'});
        req.user = payload;
        // console.log(req.user);
        next();
    }
    catch(e){
        //if an error occured return request unauthorized error
        return res.status(401).send('Invalid Token');
    }
}
