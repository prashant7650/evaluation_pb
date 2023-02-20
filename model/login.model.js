const mongoose=require("mongoose")

const loginSchema=mongoose.Schema({
    title:String,
    body:String,
    device:String,
    no_if_comments:Number

  

},{
    versionKey:false
})

const loginModel=mongoose.model("data",loginSchema)

module.exports={
    loginModel
}

