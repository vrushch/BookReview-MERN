const express = require("express");
const router = express.Router();

const {
  addToDB,
  readAll,
  readOne,
  deleteOne,
  updateOne,
  readAllWithFilter,
} = require("../db");
const { ObjectId } = require("mongodb");
const collectionName = "reviews";

router.post("/add", async function (req, res) {
  let addObject = {
    book_id: req.body.book_id,
    review_text: req.body.review_text,
  };

  try {
    await addToDB(addObject, collectionName);
    res.status(200).send();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async function (req, res) {
  try {
    const data = await readAll(collectionName);
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.patch("/edit", async function (req, res) {
  try {
    const filter = { _id: ObjectId(req.body._id) };
    const updateInfo = {
      $set: {
        review_text: req.body.review_text,
      },
    };
    await updateOne(filter, updateInfo, collectionName);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/delete/:reviewId", async function (req, res) {
  try {
    await deleteOne({ _id: ObjectId(req.params.reviewId) }, collectionName);
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/book/:bookId", async function (req, res) {
  try {
    const data = await readAllWithFilter(
      { book_id: req.params.bookId },
      collectionName
    );
    if (data) {
      res.json(data);
    } else {
      res.json({});
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
