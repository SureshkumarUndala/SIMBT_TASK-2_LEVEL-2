const Router = require("express").Router()
const protectedRoute= require("./protectedRoute")
const postModel = require("../models/PostModel")



//create post

Router.post("/posts", protectedRoute, async(req,res)=>{
    console.log(req.user)

    try{


        const posts = await postModel.create({
            title:req.body.title,
            image:req.body.image,
            description:req.body.description,
            user:req.user
        
        
        })
        console.log(posts.user)

        return res.status(201).json({
            status:"success",
            posts: posts
        })
    }
    catch(err){
        res.status(500).json({ 
            status:"failed",
            message:err.message
        })
    }
   
   
})

//get all posts
Router.get("/posts",async(req,res)=>{
    try{
        const allposts = await postModel.find().populate("user")
        if(allposts){
            return res.status(200).json({
                posts:allposts
            }
            )
        }


    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            error: err.message

        })

    }
})

//get current logged in user posts

Router.get("/posts/post", protectedRoute, async(req,res)=>{
 
    try{
        const posts = await postModel.find({user:req.user}).populate("user")
        if(posts){
            return res.json({
                posts : posts
            })

        }
        else{
            return res.json({
                message:"no posts are available"
            })
        }
    }
    catch(err){
        res.status(500).json({
            status:"Failed",
            error:err.message
        })
    }



})


// delete posts
// Router.delete("/posts", protectedRoute, async(req,res)=>{
//     try{
//         const post = 

//     }
//     catch(err){
//         res.status(500).json({
//             status:"Failed",
//             error: err.message
//         })
//     }
// })

Router.delete("/posts/:id", async(req,res)=>{
    const {id} =req.params
    

    const posts = await postModel.deleteMany({title:id})
    console.log(posts)
    return res.json({
        posts:posts
        
    })
})

Router.get("/posts/:id", async(req,res)=>{
    const {id} = req.params
    const posts = await postModel.findById({_id:id})
    console.log(posts)
    return res.json({
        posts : posts

    })
})
module.exports = Router 