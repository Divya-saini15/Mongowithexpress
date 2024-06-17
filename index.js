const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const { constrainedMemory } = require("process");
const { ObjectId } = require("mongoose").Types;
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection is successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/chatdb");
}
app.get("/favicon.ico", (req, res) => {
  res.status(204).end(); // No content
});

//List record
app.get("/chats", async (req, res) => {
  const chats = await Chat.find();
  const q = req.params.q;
  console.log(q);
  if (q) {
    const chats = await Chat.find({ $text: { $search: q } });
    res.render("index.ejs", { chats });
  } else {
    res.render("index.ejs", { chats });
  }
});

//New Route
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//Create Route
app.post("/chats/new", (req, res) => {
  const { from, to, msg } = req.body;
  const newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("chat was saved");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/chats");
});

//Detail api
// app.get("/:id",async(req,res)=>{
//     const id = req.params.id;
//     const chatData = await Chat.findOne({ _id: id });
//     console.log(chat);
//     res.render("detail.ejs",{chatData});
// })

app.get("/detail/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const chatData = await Chat.findById(id);
    if (!chatData) {
      return res.status(404).send("Chat not found");
    }

    console.log(chatData);
    res.render("detail.ejs", { chatData: chatData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching chat data");
  }
});
//Edit routes

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID");
  }

  try {
    const chatData = await Chat.findById(id);
    if (!chatData) {
      return res.status(404).send("Chat not found");
    }
    console.log(chatData);
    res.render("edit.ejs", { chatData: chatData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching chat data");
  }
});

app.put("/editone/:id", async (req, res) => {
  let { id } = req.params;
  let { msg: newMsg } = req.body;
  console.log("-----------------------", newMsg);
  let updatedChat = await Chat.findByIdAndUpdate(
    id,
    { msg: newMsg },
    { runValidators: true, new: true }
  );
  console.log(updatedChat);
  res.redirect("/chats");
});
//Delete routes
app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  try {
    const deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  res.send("root is working");
});

app.listen(8080, () => {
  console.log("server is listenting on port 8080");
});
