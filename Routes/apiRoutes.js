const fs = require("fs");
const router=require("express").Router()
const { v4: uuidv4 } = require("uuid");


router.get("/api/notes",(req,res)=>{
    fs.readFile("db/db.json","utf8",(err,data)=>{
        if (err){
            console.log (err) 
        } else {
            return res.json(JSON.parse(data))
        }
    })
})

router.post("/api/notes",(req, res)=>{
fs.readFile("db/db.json", "utf8", (err,data)=>{
    if (err){
        console.log (err)
    }
const db=JSON.parse(data) 
req.body.id=uuidv4();
db.push (req.body)
fs.writeFile("db/db.json",JSON.stringify(db),(err)=>{
    if (err) throw err
    res.json(db)
})
})
})
//delete through IDs this is a route parameter
router.delete("/api/notes/:id",(req,res)=>{
fs.readFile("db/db.json", "utf8", (err, data)=>{
    if (err) throw err
    const db=JSON.parse(data)
    for(let i=0; i <db.length;i++){
        //compare the parameters we receiving with data on the file db.json
        if(req.params.id===db[i].id){
            //method called splice removes item (i) number (1)
            db.splice([i],1)
            fs.writeFile("db/db.json", JSON.stringify(db), (err)=>{
                if (err) throw err
                res.json(db)
            })
        }
    }
})
})
module.exports=router