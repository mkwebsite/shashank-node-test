const express =require("express");
const app = express();
const db =require("./db/conn");
const path = require("path");
const Register = require("./models/register"); 
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");

const template_path =path.join(__dirname,"../templates/views"); 

app.set("view engine","ejs");
app.set("views",template_path);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/',(req,res)=>{
    res.render("index");    
})


app.get('/login',(req,res)=>{
    res.render("login");    
})

app.get('/home',auth,(req,res)=>{
    res.render("home");    
})

app.get('/admin',auth,(req,res)=>{
    res.render("admin");    
})



//create a new user in db
app.post('/register',async(req,res)=>{
    try{
        const registerEmployee = new Register({
            name : req.body.name,
            email :req.body.email,
            password:req.body.password,
            role:req.body.role
        })

        console.log(registerEmployee)
        const token = await registerEmployee.generateAuthToken();

        res.cookie("jwt",token,{
            expires:new Date(Date.now() +3000),
            httpOnly:true

        });

        const registered = await registerEmployee.save();
        res.status(201).render("index");
    } catch(error){
        console.log(error)

    }
})

//login user

app.post('/login',async (req,res)=>{
    try{
            const email = req.body.email;
            const password = req.body.password;
           const usermail = await Register.findOne({email:email});
           const token = await usermail.generateAuthToken();

           res.cookie("jwt",token,{
            expires:new Date(Date.now() +100000),
            httpOnly:true,
        

        });

           if(usermail.password === password && usermail.role ==='user' ){
            res.status(201).render("home");
           }
           if(usermail.password === password && usermail.role ==='admin' ){
            res.status(201).render("admin");
           }


    } catch(error){
        console.log("Invalid Email id and Password")
    }   
})



//jwt token generate

// const jwt = require("jsonwebtoken");

// const createToken = async()=>{
//    const token = await jwt.sign({_id:"6075a56ce303330a4cb77eaf"},"Hithisisshashank")
//    console.log(token)
//    const tokenVerify =jwt.verify(token,"Hithisisshashank")
//    console.log(tokenVerify)
// }

// createToken()

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})

