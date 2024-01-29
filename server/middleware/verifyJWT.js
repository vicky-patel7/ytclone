const jwt = require('jsonwebtoken');
const errorHandler = require('../errors/errorHandler');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(errorHandler(401, 'You are not authenticated'));
    }
    jwt.verify(token, process.env.JWT, (err, user)=> {
        if(err) {
            return next(errorHandler(403, 'Token is invalid'));
        }
        req.user = user;
        next();
    });
}

module.exports = verifyJWT;