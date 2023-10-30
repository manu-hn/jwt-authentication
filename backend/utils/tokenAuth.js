const jwt = require('jsonwebtoken');
require(`dotenv`).config();
const { StatusCodes: { BAD_REQUEST } } = require('http-status-codes')

const authenticate = async (request, response, next) => {
    try {
        const authToken = request.headers.authorization;
        

        if (!authToken || !authToken.startsWith('Bearer')) {
            return response.status(BAD_REQUEST).json({ error: true, message: `Pleas Login to Continue` })
        }

        const token = authToken.split(' ')[1];

        const decodeToken = await jwt.verify(token, process.env.JWT_KEY);
        
        const { email, password } = decodeToken;

        request.user = { email, password }
        next()



    } catch (error) {

    }
}

module.exports={authenticate}