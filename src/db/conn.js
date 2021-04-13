const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/task-manager',
 {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
}).then(()=>{
    console.log("Database is Connected")
}).catch((e)=>{
    console.log("Database is not Connected")
});