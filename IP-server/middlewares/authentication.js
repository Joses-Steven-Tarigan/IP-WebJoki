const { User }= require('../models');
const { verifyToken } = require('../helpers/jwt');


async function authentication(req, res, next) {
    try {
        const access_token = req.headers.authorization
        // console.log(access_token);

        if(!access_token) throw {name: "Unauthenticated"}

        const [bearer, token] = access_token.split(" ")
        if(bearer !== "Bearer"){
            throw { name: "Unauthenticated"}
        }

        const payload = verifyToken(token)
        // console.log(payload);

        const user = await User.findByPk(payload.id)
        // console.log(user);
        if(!user){
            throw { name: "Unauthenticated"}
        }

        req.user= {
            id: user.id,
            role: user.role
        }
        next()

    }catch(error){
        next(error)
    }
}

module.exports = authentication