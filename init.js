const mongoose = require("mongoose");
const Chat =require("./models/chat.js")
main().then(()=>{
    console.log("connection is successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/chatdb');
}




const allChats =[
    {
        from: "John Doe",
        to: "Divya",
        msg: "Hey Divya, how's it going?",
        created_at: new Date()
    },
    {
        from: "Alice",
        to: "Divya",
        msg: "Hi Divya, hope you're doing well!",
        created_at: new Date()
    },
    {
        from: "Bob",
        to: "Divya",
        msg: "Hello Divya, what are your plans for the weekend?",
        created_at: new Date()
    },
    {
        from: "Emma",
        to: "Divya",
        msg: "Hi Divya, did you watch the latest movie?",
        created_at: new Date()
    },
    {
        from: "Michael",
        to: "Divya",
        msg: "Hey Divya, can you help me with this project?",
        created_at: new Date()
    },
    {
        from: "Sophia",
        to: "Divya",
        msg: "Hello Divya, let's catch up soon!",
        created_at: new Date()
    },
    {
        from: "David",
        to: "Divya",
        msg: "Hi Divya, it's been a while since we last talked!",
        created_at: new Date()
    },
    {
        from: "Emily",
        to: "Divya",
        msg: "Hey Divya, I heard about your recent trip. How was it?",
        created_at: new Date()
    },
    {
        from: "Daniel",
        to: "Divya",
        msg: "Hi Divya, just wanted to say hi!",
        created_at: new Date()
    },
    {
        from: "Olivia",
        to: "Divya",
        msg: "Hello Divya, remember the party last year?",
        created_at: new Date()
    },
    {
        from: "Matthew",
        to: "Divya",
        msg: "Hey Divya, let's grab lunch tomorrow!",
        created_at: new Date()
    },
    {
        from: "Ava",
        to: "Divya",
        msg: "Hi Divya, do you have any book recommendations?",
        created_at: new Date()
    },
    {
        from: "Ethan",
        to: "Divya",
        msg: "Hello Divya, how's your new job going?",
        created_at: new Date()
    },
    {
        from: "Mia",
        to: "Divya",
        msg: "Hey Divya, let's go for a hike this weekend!",
        created_at: new Date()
    },
    {
        from: "James",
        to: "Divya",
        msg: "Hi Divya, just wanted to check in!",
        created_at: new Date()
    },
    {
        from: "Charlotte",
        to: "Divya",
        msg: "Hello Divya, how's your family?",
        created_at: new Date()
    },
    {
        from: "Alexander",
        to: "Divya",
        msg: "Hey Divya, I have a question about the assignment.",
        created_at: new Date()
    },
    {
        from: "Amelia",
        to: "Divya",
        msg: "Hi Divya, let's plan a movie night soon!",
        created_at: new Date()
    },
    {
        from: "Benjamin",
        to: "Divya",
        msg: "Hello Divya, have you tried that new restaurant?",
        created_at: new Date()
    },
    {
        from: "Abigail",
        to: "Divya",
        msg: "Hey Divya, let's go shopping this weekend!",
        created_at: new Date()
    }
]







Chat.insertMany(allChats);
