const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser (req,res){

    const {email,password,role = "employee"} = req.body;

    const isUserAlreadyExist = await userModel.findOne({
        $or : [
            {email}
        ]
    })

    if(isUserAlreadyExist){
        return res.status(400).json({
            message : "User already exist"
        })
    }

    const hash = await bcrypt.hash(password,10);

    const user = await userModel.create({
        email,
        password : hash,
        role
    })

    const token = jwt.sign({
        id : user._id,
        role : user.role
    },process.env.JWT_SECRET_KEY)

    res.cookie("token",token)

    return res.status(201).json({
        message : "User registered successfully",
        user : {
            id : user._id,
            email : user.email,
            role : user.role
        }
    })
}

async function LoginUser (req,res){

    const {email,password} = req.body;

    const user = await userModel.findOne({
        $or : [
            {email}
        ]
    })

    if(!user){
        return res.status(404).json({
            message : "User not found"
        })
    }

    const isPasswordMatched = await bcrypt.compare(password,user.password)

    if(!isPasswordMatched){
        return res.status(404).json({
            message : "Invalid Password"
        })
    }

    const token = jwt.sign({
        id : user._id,
        role : user.role
    },process.env.JWT_SECRET_KEY)


    res.cookie("token",token)

    res.status(200).json({
        message : "User Login Successfully",
        user : {
            id : user._id,
            email : user.email,
            password : user.password,
            role : user.role
        }
    })

}

async function ChangePassword (req,res){

}

module.exports = { registerUser ,LoginUser, ChangePassword };