const express = require('express');
const cors = require("cors");
const axios = require("axios"); 

const app = express();

app.use(cors());
app.use(express.json());

const delay = (time) => new Promise(resolve => {setTimeout(()=>{
   resolve("processing done");
},time)})

app.post("/events",async (req,res)=>{

    console.log("request called")
    try {
        const {type,data} = req.body;
        console.log(type)

        await delay(5000);
    
        if(type == "commentCreation"){
        const status = data.content.includes('orange') ? "rejected" : "approved";
    
        data.status = status;
        await axios.post("http://event-bus-srv:8005/events",{
        type:"commentModeration",
        data
    }); 
       console.log(status)
   
    }

         res.status(200).json({
            message:"moderation done"
        })
    } catch (error) {
        console.log(error)
    }
})


app.listen(8003,()=>{
    console.log("moderation service running on port 8003");
})