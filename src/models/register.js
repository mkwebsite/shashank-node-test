const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true 
        }
    }]
})
   
employeeSchema.methods.generateAuthToken = async function(){
    try{
        //console.log(this._id)
        const token = jwt.sign({_id:this._id.toString()},"shashank")
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        //console.log(token)
        return token;
    } catch(error){
        res.send(error)
    }
}

const Register = new mongoose.model("Register",employeeSchema);
module.exports = Register;