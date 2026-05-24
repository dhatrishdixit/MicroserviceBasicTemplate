const express = require("express");
const cors = require("cors")
const axios = require("axios");

const app = express();
app.use(express.json()); 
app.use(cors());

// {postId,Title,comments:[]}
const queryData = {
 
}

const handleEvent = (event) => {
    if(event.type == "postCreation"){
        const {postId,title} = event.data;
        queryData[postId] = {
            postId,
            title,
            comments:[]
        }
    }else if(event.type == "commentCreation"){
        const {postId,commentId,content,status} = event.data;
        queryData[postId].comments.push({
            commentId,content,status
        })
    }else if(event.type == "commentUpdation"){
        const {postId,commentId,content,status} = event.data;
        let comment = queryData[postId].comments.find(commentData => commentData.commentId == commentId);
        comment.content = content;
        comment.status = status;
    }

}

app.get("/completeData",(req,res)=>{
    res.status(200).json(queryData);
})
  
app.post("/events",(req,res)=>{
    const event = req.body;

    if(event.type == "postCreation"){
        const {postId,title} = event.data;
        queryData[postId] = {
            postId,
            title,
            comments:[]
        }
    }else if(event.type == "commentCreation"){
        const {postId,commentId,content,status} = event.data;
        queryData[postId].comments.push({
            commentId,content,status
        })
    }else if(event.type == "commentUpdation"){
        const {postId,commentId,content,status} = event.data;
        let comment = queryData[postId].comments.find(commentData => commentData.commentId == commentId);
        comment.content = content;
        comment.status = status;
    }

    console.log(JSON.stringify(queryData))

    res.status(201).json({
          message:"Query db filled",
    })
})


app.listen(8002,async ()=>{
    console.log("Query service running on port 8002")

    const res = await axios.get("http://localhost:8005/events");

    for(const event of res.data){
        console.log(`processing event of type : ${event.type}`)
        handleEvent(event);
    }
})