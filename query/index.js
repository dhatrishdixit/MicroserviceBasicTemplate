const express = require("express");
const cors = require("cors")
const axios = require("axios");

const app = express();
app.use(express.json()); 
app.use(cors());

// {postId,Title,comments:[]}
const queryData = {
 
}

app.get("/completeData",(req,res)=>{
    res.status(200).json(queryData);
})

app.post("/events",(req,res)=>{
    const event = req.body;

    if(event.type == "postCreation"){
        const {postId,title} = event.data;
        queryData[postId] = {
            title,
            comments:[]
        }
    }else if(event.type == "commentCreation"){
        const {postId,commentId,content} = event.data;
        queryData[postId].comments.push({
            commentId,content
        })
    }

    console.log(JSON.stringify(queryData))

    res.status(201).json({
          message:"Query db filled",
    })
})


app.listen(8002,()=>{
    console.log("Query service running on port 8002")
})