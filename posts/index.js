const express = require("express");
const cors = require("cors");
const axios = require("axios")

const app = express();
app.use(express.json()); 
app.use(cors()) 

const posts= {

}
 
app.get("/posts",(req,res)=>{
    res.status(200).send(posts);
})

app.post("/events",(req,res)=>{
    console.log(req.body);
    res.status(200).json({
    message: `eventType: ${req.body.type}`
    })
}) 

//  emit event on creation 
  
// {type,{postId,title}}
app.post("/posts",async (req,res)=>{
try {
    const postId = Math.floor(Math.random()*1e8);
    
    const {title} = req.body;

    posts[postId] = {
        title,id:postId
    }

    await axios.post("http://localhost:8005/events",{
        type:"postCreation",
        data:{
            postId,
            title
        }
    });

    res.status(201).json({
          post:postId,
          message:"Post created & event sent to eventBus",
    })
} catch (error) {
    console.log(error)
}    
})

app.listen(8000,()=>{
    console.log("Post Service running on port 8000")
})
