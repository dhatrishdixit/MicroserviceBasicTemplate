const express = require('express');
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/events",(req,res)=>{
    
    const event = req.body;
    
    axios.post("http://localhost:8000/events",event).then(res=>console.log(res)).catch(err=>console.log(err));
    axios.post("http://localhost:8001/events",event).then(res=>console.log(res)).catch(err=>console.log(err));
    axios.post("http://localhost:8002/events",event).then(res=>console.log(res)).catch(err=>console.log("error in query service"));

    res.status(200).json({
          message:"Event emitted to all the listening services",
    })
})

app.listen(8005,()=>{
    console.log("Event Bus running on port 8005")
})