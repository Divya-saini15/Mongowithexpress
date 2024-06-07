const express = require("express");
const app=express();
const mongoose = require("mongoose");
const path = require("path");
const Chat =require("./models/chat.js");
const { constrainedMemory } = require("process");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

main().then(()=>{
    console.log("connection is successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/chatdb');
}

//List record
app.get("/chats", async (req,res)=>{
    const chats = await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

//New Route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//Create Route
app.post("/new",(req,res)=>{
    const {from , to , msg} = req.body;
    const newChat = new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at :new Date(),
    });
    newChat
    .save()
    .then((res)=>{
        console.log("chat was saved");
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/chats");
})



app.get("/",(req,res) => {
    res.send("root is working");
})

app.listen(8080,()=>{
    console.log("server is listenting on port 8080");
})