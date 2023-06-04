const express = require("express")
const Router = express.Router()
const UserModel = require("../models/UserModel")
const bcrypt = require("bcryptjs")
const dotenv = require("dotenv").config()

const jwt = require("jsonwebtoken")
const secretkey = process.env.jwtsecretkey 
const protectedRoute= require("./protectedRoute")



Router.post("/signup", async(req,res)=>{
    try{
        const {fullname, email, password} = req.body
        console.log(fullname,email,password)
        if(!fullname || !email || !password){
            return res.status(400).json({
                status:"Failed", 
                message:"all fields are mandatory"
            })
        }
        // avoid duplicate user
        const existedUser = await UserModel.findOne({email})
  
        if(existedUser){
            return res.status(401).json({
                cod:"401",
                message:"User is already existed"
            })
        }
        // if user is new one, then encrypt the password and store the user detalis in db
        bcrypt.hash(password, 10, (err, hashpassword)=>{
            if(err){
                return res.json({
                    status:"failed",
                    error:err.message
                })

            }  
            const user = UserModel.create({fullname:fullname,email:email,password:hashpassword})
            return res.status(201).json({
                status:"success",
                message:"user registered successfully"

            })
  
        })
    }
  
   catch(err){
    res.status(500).json({
        status:"Failed",
        message:err.message
    })
   }
})
Router.post("/login", async(req,res)=>{
   try{
    const {email, password} = req.body
    const user = await UserModel.findOne({email})
    if(!user){
        return res.status(400).json({
            status:"Failed",
            message:"user does not existed",
            cod:"400"
        })
    }
    // if user is existed then we compare the passwords
    bcrypt.compare(password, user.password, (err,result)=>{
        if(err){
            return res.status(500).json({
                status:"Failed",
                error:err.message
            })
        }
        if(result){
            // generate token
            const token = jwt.sign({id:user._id},secretkey,{expiresIn:"1h"})
            return res.json({
                status:"success",
                message:"Log in successfull",
                token:token

            })
        }
        else{
            return res.status(401).json({
                status:"Failed",
                message:"Invalid credentials"
            })
        }
    })




   }
   catch(err){
    res.status(500).json({
        status:"Failed",
        message:err.message
    })
   }
})

// create new posts


module.exports = Router