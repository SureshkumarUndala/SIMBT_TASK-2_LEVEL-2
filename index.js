const express = require("express")
const app = express()
const Authentication = require("./Routes/Authentication")
const blogRoute = require("./Routes/blogroutes")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")
const UserModel = require("./models/UserModel")
const cors = require("cors")
app.use(cors())
mongoose.connect(process.env.mongodburl).then(()=>console.log("db connected"))


app.use(express.json())
app.use("/api/v1", Authentication)
app.use("/api/v1", blogRoute)

app.listen(process.env.port,()=>console.log(`serever started at ${process.env.port}`))