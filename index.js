const { query } = require("express")
const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {userModel}=require("./model/user.model")
const {loginRouter}=require("./routes/login.routes")
const {authonticate}=require("./middleware/authonticate.middleware")
const cors=require("cors")
require("dotenv").config()



const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("welcome from prashant to the app")
})

app.use("/users",userRouter)
app.use(authonticate)

app.use("/logins",loginRouter)
// app.use(authonticate)

app.get("/users",async(req,res)=>{
    let query=req.query
    console.log(query)
    try{
        const users=await userModel.find(query)
        res.send(users)
    }catch(err){
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(err){
        console.log(err)
        console.log("can not connected")
    }
    console.log(`port is running at ${process.env.port}`)
})