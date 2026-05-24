const express = require('express');
const cors = require("cors");
const axios = require("axios"); 

const app = express();

app.use(cors());
app.use(express.json());

app.post("/events",(req,res)=>{
    const {type,data} = req.body;
    
    if(type == "commentCreated"){
        
    }
})


app.listen(8003,()=>{
    console.log("moderation service running on port 8003");
})