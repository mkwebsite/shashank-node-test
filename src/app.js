const express =require("express");
const app = express();
const db =require("./db/conn");
const path = require("path");
const Register = require("./models/register"); 

const template_path =path.join(__dirname,"../templates/views"); 

app.set("view engine","ejs");
app.set("views",template_path);

app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('/',(req,res)=>{
    res.render("index");    
})


app.get('/login',(req,res)=>{
    res.render("login");    
})

app.get('/home',(req,res)=>{
    res.render("home");    
})

//create a new user in db
app.post('/register',async(req,res)=>{
    try{
        const registerEmployee = new Register({
            name : req.body.name,
            email :req.body.email,
            password:req.body.password
        })
        const registered = await registerEmployee.save();
        res.status(201).render("index");
    } catch(error){
        console.log(error)

    }
})

app.post('/login',async (req,res)=>{
    try{
            const email = req.body.email;
            const password = req.body.password;
           const usermail = await Register.findOne({email:email});

           if(usermail.password === password){
            res.status(201).render("home");
           }


    } catch(error){
        console.log("Invalid Email id and Password")
    }   
})





app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})