module.exports = function errorHandler(error, req, res, next) {
    console.error(error);
    if (error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
        return res.status(400).json({ message: error.errors[0].message })
    }

    if(error.name == "EmailPasswordNotFound"){
        return res.status(400).json({
            message: "Email and Password are required"
        })
    }

    if(error.name == "InvalidEmailPassword"){
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    if (error.name == 'Unauthenticated'){
        return res.status(401).json({ 
            message: "Invalide Token" 
        })
    }

    if (error.name == 'JsonWebTokenError'){
        return res.status(401).json({ 
            message: "Invalide Token" 
        })
    }

    if (error.name == 'Forbidden'){
        return res.status(403).json({ 
            message: "You're not authorized " 
        })
    }
 
    if (error.name == 'NotFound'){
        return res.status(404).json({ 
            message: "Service not found " 
        })
    }
    
    
    res.status(500).json({ message: 'Internal server error'})
}
