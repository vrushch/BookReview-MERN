const express = require("express");
const messageRouter = express.Router();

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
const collectionName = "messages";

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

// router.get("/", async function (req, res) {
//     try {
//       const data = await readAll(collectionName);
//       res.json(data);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Internal Server Error");
//     }
//   });

messageRouter.get("/public-message", async function (req, res) {
  try {
    const data =
      "This API doesnt require an access token to share this message";
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

messageRouter.get("/protected-message", checkJWT, async function (req, res) {
  try {
    const data = "API validated your access Token";
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = messageRouter;
