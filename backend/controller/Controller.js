const PersonSchema = require('../models/Model.js')
const { StatusCodes: { BAD_GATEWAY, OK, CREATED, NOT_FOUND, BAD_REQUEST, ACCEPTED, NOT_ACCEPTABLE } } = require('http-status-codes');
const { generateToken } = require('../utils/tokenGenerator.js');
const jwt = require('jsonwebtoken')
require(`dotenv`).config()


const personRegister = async (request, response, next) => {
    try {
        const { name, email, password, mobile } = request.body
        const isDataAvailable = await PersonSchema.findOne({ email })

        if (!isDataAvailable) {
            const newPerson = await PersonSchema.create({ name, email, mobile, password })
            return response.status(CREATED).json({
                error: false, message: 'Data Registered', data: {
                    name: newPerson.name,
                    email: newPerson.email,
                    mobile: newPerson.mobile,

                }
            })
        }
        return response.status(BAD_REQUEST).json({ error: true, message: `Email Already Registered` })




    } catch (error) {
        next(error)
    }
}


const loginPerson = async (request, response, next) => {
    try {

        const { email, password } = request.body;
        const userInfo = await PersonSchema.findOne({ email });
        if (!userInfo) {
            return response.status(NOT_FOUND).json({ error: true, message: `User not found` });
        }
        const token = await generateToken(email, password);
        console.log(token)

        const userData = {
            name: userInfo.name,
            email: userInfo.email,
            mobile: userInfo.mobile,

        }

        return password === userInfo.password ? response.status(ACCEPTED).json({ error: false, message: `Login Successful`, userData, token })
            : response.status(NOT_ACCEPTABLE).json({ error: true, message: `Invalid Credentials` })


    } catch (error) {

    }
}

const updatePerson = async (request, response, next) => {
    try {
        const { pid } = request.params
        const { name, email, password } = request.body


        const personInfo = await PersonSchema.findOne({ _id: pid })

        if (!personInfo) {
            return response.status(NOT_FOUND).json({ error: true, message: `No Data Found`, data: personInfo })
        }

        const person = await PersonSchema.findByIdAndUpdate({ _id: pid }, { $set: { name, email, password } }, { new: true, runValidators: true });
        const data = {
            name: name || person.name,
            email: email || person.email,

        }

        response.status(OK).json({ error: false, message: 'Details Updated', data })
    } catch (error) {

    }
}


module.exports = {
    personRegister, loginPerson, updatePerson
}