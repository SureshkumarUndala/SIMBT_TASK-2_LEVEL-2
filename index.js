const express = require("express")
const app = express()
const Authentication = require("./Routes/Authentication")
const blogRoute = require("./Routes/blogroutes")
const mongoose = require("mongoose")
const UserModel = require("./models/UserModel")
const cors = require("cors")
app.use(cors())
mongoose.connect("mongodb+srv://instacloneapi:Instacloneapi@cluster0.dlpa3r9.mongodb.net/?retryWrites=true&w=majority").then(()=>console.log("db connected"))


app.use(express.json())
app.use("/api/v1", Authentication)
app.use("/api/v1", blogRoute)

app.listen(8080,()=>console.log(`serever started at 8080`))
