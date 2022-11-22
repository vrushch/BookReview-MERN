const express = require("express");
const app = express();
const port = 5001;
const router = require("./routes/book");
const {connectToDB} = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/books",router)
app.use(express.static("public"));

app.get("/",function(req,res){
    res.send("booksapi")
    
});

app.use((req, res, next) => {
    res.status(404).send("Not found");
})

app.listen(port, () =>{
    console.log(`listening on ${port}`);
    connectToDB();
})