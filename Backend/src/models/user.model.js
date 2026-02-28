// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({

//     email : {
//         type : String,
//         require : true,
//         unique : true
//     },
//     password : {
//         type : String,
//         required : true
//     },
//     role : {
//         type : String,
//         enum : ['employee','admin'],
//         default : 'employee'
//     },
//     department : {
//         type : String,
//         default : ''
//     }
// })

// const userModel = mongoose.model("user",userSchema)


// module.exports = userModel;











// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({

//     email : {
//         type : String,
//         require : true,
//         unique : true
//     },
//     password : {
//         type : String,
//         required : true
//     },
//     role : {
//         type : String,
//         enum : ['employee','admin'],
//         default : 'employee'
//     },
//     department : {
//         type : String,
//         default : ''
//     },
//     name : {
//         type : String,
//         default : '',
//         maxlength : [14, 'Name cannot exceed 14 characters']
//     },
//     shift : {
//         type : String,
//         enum : ['AM', 'PM', ''],
//         default : ''
//     }
// })

// const userModel = mongoose.model("user",userSchema)


// module.exports = userModel;






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
    },
    name : {
        type : String,
        default : '',
        maxlength : [14, 'Name cannot exceed 14 characters']
    },
    shift : {
        type : String,
        enum : ['AM', 'PM', 'Night', ''],
        default : ''
    }
})

const userModel = mongoose.model("user",userSchema)

module.exports = userModel;