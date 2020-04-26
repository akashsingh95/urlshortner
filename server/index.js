const express=require("express");
const app=express();
const bodyParser=require("body-parser")
const mongoose=require("mongoose")
const mongoURl="mongodb://localhost:27017/url-shortner";



const connectionOption={
    keepAlive:true,
    reconnectTries:Number.MAX_VALUE
};

mongoose.Promise=global.Promise;
mongoose.connect(mongoURl,connectionOption,(err,db)=>{
    if (err) console.log("Error",err);
    console.log("connected to mongodb")
})

app.use(bodyParser.json())
require('./models/UrlShorten')
require("./routes/urlshorten")(app);

app.listen(3000,()=>{
    console.log("app listening at 3000")
})

