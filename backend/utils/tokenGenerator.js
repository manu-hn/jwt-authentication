const jwt = require('jsonwebtoken');

require('dotenv').config()


const generateToken = async (email, password) => {
    try {
        const token = await jwt.sign({ email, password }, process.env.JWT_KEY, {expiresIn : process.env.JWT_EXPIRE_TIME});
        return token
    } catch (error) {
        console.log(error)
    }
}


module.exports={
    generateToken
}