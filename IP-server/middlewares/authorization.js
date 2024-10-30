const {Service}= require('../models');

async function memberAuthorization(req, res, next) {
    console.log(req, ">>>ini req");
    try {
        await Service.findByPk(req.params.id)
        
        if(!Service) {
            throw {name: "NotFound"}
        }
        console.log(req.user, "ini role");
        if (req.user.role !== "Admin") {
            throw { name: "Forbidden" };
        }
        next()
    }catch(error) {
        next(error)
    }
}

module.exports= memberAuthorization