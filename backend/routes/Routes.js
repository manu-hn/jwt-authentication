const express=require(`express`)
const  { personRegister, loginPerson, updatePerson }= require('../controller/Controller.js')
const router=express.Router();
const {authenticate} = require('../utils/tokenAuth.js')

router.post('/register',personRegister)
router.post('/login',loginPerson)
router.put('/update/:pid',authenticate, updatePerson )

module.exports=router