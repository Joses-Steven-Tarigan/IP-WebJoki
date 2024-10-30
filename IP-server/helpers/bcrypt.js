const bcrypt = require('bcryptjs');
const saltRounds = 10

exports.encrypt = (password) => {
    return bcrypt.hashSync(password, saltRounds)
}

exports.compare = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
}