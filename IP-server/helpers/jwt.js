const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;


//pengirim
exports.generateToken = ({id, email, username}) => {
    return jwt.sign({id, email, username}, secretKey)
}

exports.verifyToken = (token) => {
    return jwt.verify(token, secretKey); 
}