const fs = require("fs");
const router=require("express").Router()
const { v4: uuidv4 } = require("uuid");
uuidv4();

router.get("/api/notes",(req,res)=>{
    console.log ("route hit")
    fs.readFile("db/db.json","utf8",(err,data)=>{
        if (err){
            console.log (err) 
        } else {
            console.log (data)
            return res.json(JSON.parse(data))
        }
    })
})

module.exports=router