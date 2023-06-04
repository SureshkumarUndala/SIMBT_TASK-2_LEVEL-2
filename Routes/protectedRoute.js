const express = require("express")
const app = express()
const secretkey = process.env.jwtsecretkey
const jwt = require("jsonwebtoken")

const protectedRoute = async(req,res,next)=>{
    if(req.headers.authorization){
        const token = req.headers["authorization"]?.split("Bearer ")[1]
        console.log(token)
        //verify the  token
        if(token){
            jwt.verify(token, secretkey,(err,decoded)=>{
              

                if(err){
                    return res.status(403).json({
                        status:"failed",
                        message:"Invalid token"
                    })
                }
                req.user = decoded.id
                console.log(req.user)
                next()
            })
        }
        else{
            return res.status(401).json({
                status:"Failed",
                message:"Token is missing"
            })

        }
    }
    else{
        return res.status(403).json({
            status:"Failed",
            message:"Not authenticated user"
        })
    }
}
module.exports = protectedRoute