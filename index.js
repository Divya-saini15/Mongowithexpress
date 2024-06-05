const express = require("express");
const app=express();
const mongoose = require("mongoose");
const path = require("path");
const Chat =require("./models/chat.js")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")

main().then(()=>{
    console.log("connection is successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/chatdb');
}


app.get("/",(req,res) => {
    res.send("root is working");
})

app.listen(8080,()=>{
    console.log("server is listenting on port 8080");
})