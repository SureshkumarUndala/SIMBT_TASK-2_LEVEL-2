const mongoose = require("mongoose")
const mongooseId = mongoose.Schema.ObjectId

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    description:{
        type:String,
        required:true,
       
    },
    image:{
        type:"String",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
    
      
    }
})

const PostModel = mongoose.model("PostModel", postSchema)
module.exports = PostModel