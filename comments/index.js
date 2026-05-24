const express = require("express");
const cors = require("cors")
const axios = require("axios");

const app = express();
app.use(express.json()); 
app.use(cors());

const commentsByPostId= {

}

app.get("/posts/:id/comments",(req,res)=>{

    res.status(200).send(commentsByPostId[req.params.id] || []);
})

app.post("/events",async (req,res)=>{
    console.log(req.body);
    
    const {type,data} = req.body;

    if(type== "commentModeration"){

        console.log(commentsByPostId)
        let comment =  commentsByPostId[data.postId].find(commentData => commentData.id == data.commentId);
        console.log(comment)
        comment.status = data.status;

        await axios.post("http://localhost:8005/events",{
        type:"commentUpdation",
        data
    });
    }

    res.status(200).json({
    message: `eventType: ${req.body.type}`
    })
})

app.post("/posts/:id/comments",async (req,res)=>{
try {
    const postId = req.params.id;
    console.log(postId)
    const {content} = req.body;
    const commentId = `cc-${Math.floor(Math.random()*1e13)}`; 

    const comment = {
        id:commentId,content,status:"pending"
    }

    commentsByPostId[postId] = Object.hasOwn(commentsByPostId,postId) ? [
        ...commentsByPostId[postId],comment
    ] : [comment] ;

    await axios.post("http://localhost:8005/events",{
        type:"commentCreation",
        data:{
            postId,
            commentId,
            content,
            status:"pending"
        }
    });

    res.status(201).json({
        message:`comment created to the post ${postId} & event send to the eventBus`,
        comment: comment
    })
} catch (error) {
    console.log(error);
}
})


app.listen(8001,()=>{
    console.log("Post Service running on port 8001")
})