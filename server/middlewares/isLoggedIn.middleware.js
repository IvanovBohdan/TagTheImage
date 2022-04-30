const jwt = require('jsonwebtoken');
const config = require('../config');

const isLoggedIn = (req, res, next) => {
    if(req.method === 'OPTIONS'){
        return next();
    }
    try{
        const token = req.headers?.authorization?.split(' ')[1];

        if(!token){
            return res.status(401).json({message: 'No token provided!'})
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    }catch(e){
        res.status(401).json({message: 'Auth failed!'})
    }

}

module.exports = isLoggedIn;