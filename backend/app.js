const express = require("express");
const app = express();
const cors = require("cors");
const port = 5001;
const bookRouter = require("./routes/books");
const reviewRouter = require("./routes/reviews")
const {connectToDB} = require('./db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/books",bookRouter);
app.use("/api/reviews", reviewRouter);
app.use(cors());

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