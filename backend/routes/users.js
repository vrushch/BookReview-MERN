const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

const {
  addToDB,
  readAll,
  readOne,
  deleteOne,
  updateOne,
  readAllWithFilter,
} = require("../db");
const { ObjectId } = require("mongodb");
const collectionName = "users";

router.get("/profile", requiresAuth(), async (req, res) => {
  const user_email = req.oidc.email;

  try {
    const data = await readOne({ _id: ObjectId(user_email) }, collectionName);
    if (data) {
      res.json(data);
    } else {
      res.status(404).send("User Not found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
