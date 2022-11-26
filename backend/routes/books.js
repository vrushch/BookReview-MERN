const express = require("express");
const router = express.Router();

const { addToDB, readAll, readOne, deleteOne, updateOne } = require('../db');
const { ObjectId } = require("mongodb");
const collectionName = "books";

router.post("/add", async function (req, res) {
   try {
     await addToDB(req.body, collectionName);
     res.status(200).send();
   }
   catch (err) {
      console.log(err);
     res.status(500).send('Internal Server Error');
   }
});

router.get("/",async function(req,res){
   try{
      const data = await readAll(collectionName);
      res.json(data);
   }
   catch(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
   }
});


router.get("/:bookId",async function(req,res){
   try{
      const data = await readOne({ _id: ObjectId(req.params.bookId) }, collectionName);
      if (data){
         res.json(data);
      }else{
         res.status(404).send('Not found');
      }
   }
   catch(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
   }
});


module.exports = router;