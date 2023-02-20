const jwt = require("jsonwebtoken")

const authonticate = (req,res,next) => {
    const token = req.headers.authorization
    if(token){
        
        jwt.verify(token, 'masai', (err, decoded)  => {
            if(decoded){
                req.body.user = decoded.userID
                next()
            }else{
                 res.send({"msg":"pLease Login"})
            }
        });
    } else {
        res.send({"msg":"Please Login"})
    }

    
}

module.exports ={
    authonticate
}