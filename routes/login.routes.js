const express=require("express")
const {loginModel}=require("../model/login.model")
// const bcrypt=require("bcrypt")
// let jwt=require("jsonwebtoken")

const loginRouter=express.Router();

loginRouter.get("/",async(req,res)=>{
    const logins=await loginModel.find()
    res.send(logins)
})
loginRouter.post("/register",async(req,res)=>{
    const payload=req.body
    const login=new loginModel(payload)
    await login.save()
    res.send("items register")
})

loginRouter.patch("/update/:id",async(req,res)=>{
    const loginID=req.params.id
    
    await loginModel.findByIdAndUpdate({id:loginID})
    res.send({"msg":"Login hsa been register"})
})

loginRouter.delete("/delete/:id",async(req,res)=>{
    const loginID=req.params.id
    
    await loginModel.findByIdAndDelete({id:loginID})
    res.send({"msg":`login with id ${loginID} has been deleted`})
})

module.exports={
    loginRouter

}