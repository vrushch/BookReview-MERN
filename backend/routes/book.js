const express = require("express");
const router = express.Router();

const path = require("path");


const { addToDB, readAll, readOne, deleteOne, updateOne } = require('../db');
const { ObjectId } = require("mongodb");



router.post("/add", async function (req, res) {
   console.log(req.body);
   try {
     await addToDB(req.body);
   }
   catch (err) {
     res.status(500).send('Internal Server Error');
   }
});

router.get("/",async function(req,res){
   try{
      const data = await readAll();
      res.json(data);
      //res.render('tasks.pug',{values:data});
   }
   catch(err){
      console.log(err);
      res.status(500).send('Internal Server Error');
   }
});


router.get("/:bookId",async function(req,res){
   try{
      const data = await readOne({ _id: ObjectId(req.params.bookId) });
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