const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth =async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        const verifyUser = jwt(token,"shashank");
        const user =Register.findOne({_id:verifyUser._id});
        //console.log(user);
        next();
    } catch(error){
        res.send(error)
    }

}

module.exports =auth;
