const express = require('express');
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const eventArr = [];

app.post("/events",(req,res)=>{
    
    const event = req.body;
    eventArr.push(event);
    console.log("event pushed : ",event)
    
    axios.post("http://localhost:8000/events",event).then(_=>{}).catch(err=>console.log("post service error : "+ err.message));
    axios.post("http://localhost:8001/events",event).then(_=>{}).catch(err=>console.log("comment service error : " +err.message));
    axios.post("http://localhost:8002/events",event).then(_=>{}).catch(err=>console.log("query service error : " + err.message));
    axios.post("http://localhost:8003/events",event).then(_=>{}).catch(err=>console.log("moderation service error : " + err.message));


    res.status(200).json({
          message:"Event emitted to all the listening services",
    })
})

app.get("/events",(_,res)=>{
    res.send(eventArr);
})

app.listen(8005,()=>{
    console.log("Event Bus running on port 8005")
})
