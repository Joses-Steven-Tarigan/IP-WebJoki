
const {User}= require('../models');
const { generateToken } = require('../helpers/jwt');
const { compare } = require('../helpers/bcrypt');



exports.register = async (req, res, next) => {
    const { username, email, password } = req.body
    try {
        await User.create({ username, email, password })
        res.status(201).json({ message: 'User has been registered' })
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    let { email, password } = req.body
    try {
        if (!email || !password) throw { name: "EmailPasswordNotFound" }

        let user = await User.findOne({
            where: {
                email
            }
        });
        console.log(user.role, "ini user");
        if (!user) throw { name: "InvalidEmailPassword" }

        if (!compare(password, user.password)) {
            throw { name: "InvalidEmailPassword" }
        }

        const access_token = generateToken(user);

        res.status(200).json({ access_token })

    } catch (error) {
        next(error)
    }
}

