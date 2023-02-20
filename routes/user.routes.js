const express=require("express")
const {userModel}=require("../model/user.model")

const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userRouter=express.Router();

userRouter.post("/register", async(req,res)=>{
    const {name,email,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.send({"msg":"Something went wrong","error":err.message})
            }else{
                const user=new userModel({name,email,password:hash})
                await user.save();
                res.send({"msg":"New user has been register"})
            }
        })
        
    } catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try{
        const user =await userModel.find({email})
        console.log(user)
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Login succes","token":token})

                }else{
                    res.send("wrong credential")
                }
            })
        }
        else{
            res.send("credential not found")
        }
        
        
    } catch(err){
        console.log(err)
        res.send({"msg":"Something went wrong","error":err.message})
    }
})

module.exports={
    userRouter

}