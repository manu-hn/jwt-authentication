const {Schema, model} = require('mongoose'); 


const PersonSchema = new Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps : true});


module.exports = model('person', PersonSchema);