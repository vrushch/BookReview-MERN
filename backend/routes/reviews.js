const express = require("express");
const router = express.Router();
const { auth } = require("express-oauth2-jwt-bearer");
const { expressjwt: jwt } = require("express-jwt");
const jwks = require("jwks-rsa");

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

var checkJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: process.env.AUTH0_JWK_URI,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: process.env.AUTH0_ISSUER,
  algorithms: ["RS256"],
});

router.post("/add", checkJWT, async function (req, res) {
  const auth0Id = req.auth.sub;
  let addObject = {
    book_id: req.body.book_id,
    review_text: req.body.review_text,
    user_id: auth0Id,
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

router.patch("/edit", checkJWT, async function (req, res) {
  const auth0Id = req.auth.sub;
  try {
    const filter = { _id: ObjectId(req.body._id), user_id: auth0Id };
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

router.delete("/delete/:reviewId", checkJWT, async function (req, res) {
  const auth0Id = req.auth.sub;
  try {
    await deleteOne(
      { _id: ObjectId(req.params.reviewId), user_id: auth0Id },
      collectionName
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/book/:bookId", checkJWT, async function (req, res) {
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

router.get("/bookuser", checkJWT, async function (req, res) {
  const auth0Id = req.auth.sub;
  try {
    const data = await readAllWithFilter({ user_id: auth0Id }, collectionName);
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

router.get("/reviewedbooks", checkJWT, async function (req, res) {
  const auth0Id = req.auth.sub;
  try {
    let data = await readAllWithFilter({ user_id: auth0Id }, collectionName);
    let books = [];
    data.forEach((item) => books.push(ObjectId(item.book_id)));
    books = [...new Set(books)];
    data = await readAllWithFilter(
      {
        _id: { $in: books },
      },
      "books"
    );
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
