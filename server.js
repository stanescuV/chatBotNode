import express from "express"
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors()); 


app.get("/", (req, res)=> {
    res.send("hello world ! ")
})

app.listen(port, ()=>{
    console.log(`Exemple app 123 listening on ${port}`)
})