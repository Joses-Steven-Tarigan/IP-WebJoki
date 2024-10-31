
const {User}= require('../models');
const { generateToken } = require('../helpers/jwt');
const { compare } = require('../helpers/bcrypt');
const {OAuth2Client} = require('google-auth-library');



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
        if (!email || !password) {
            throw { name: "EmailPasswordNotFound" }
        }

        let user = await User.findOne({
            where: {
                email
            }
        });
        // console.log(user.role, "ini user");
        if (!user) {
            throw { name: "InvalidEmailPassword" }
        }
        
        if (!compare(password, user.password)) {
            throw { name: "InvalidEmailPassword" }
        }

        const access_token = generateToken(user);

        res.status(200).json({ access_token })

    } catch (error) {
        next(error)
    }
}
    exports.googleLogin = async (req, res, next) => {
        
        try {
            const {token} = req.headers;
            const client = new OAuth2Client();
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            // console.log(payload, "<<< ini payload");
            const payload = ticket.getPayload();

            let {user, created} = await User.findOrCreate({
                where: {
                    email: payload["email"],
                    username: payload["email"],
                },
                defaults: {
                    email: payload["email"],
                    username: payload["email"],
                    password: "password-google"
                },
                hooks: false,
            })

            const accessToken = generateToken(user)
           res.status(200).json({ access_token: accessToken})
        } catch (error) {
            next(error)
        }
    }


