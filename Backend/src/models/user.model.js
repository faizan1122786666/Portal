const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    email : {
        type : String,
        require : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type : String,
        enum : ['employee','admin'],
        default : 'employee'
    },
    department : {
        type : String,
        default : ''
    }
})

const userModel = mongoose.model("user",userSchema)


module.exports = userModel;