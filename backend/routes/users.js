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
const collectionName = "users";

// const checkJWT = auth({
//   audience: process.env.REACT_APP_AUTH0_AUDIENCE,
//   issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
// });
console.log(process.env.AUTH0_ISSUER);
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

// Profile Read
router.get("/profile", checkJWT, async (req, res) => {
  const auth0Id = req.auth.sub;

  const user = await readOne({ auth0Id: auth0Id }, collectionName);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send("User not found");
  }
});

// Profile Update
router.put("/profile", checkJWT, async (req, res) => {
  const auth0Id = req.auth.sub;
  const { name, bio, gender } = req.body;
  const updateInfo = {
    $set: {
      name: req.body.name,
      bio: req.body.bio,
      gender: req.body.gender,
    },
  };
  await updateOne({ auth0Id: auth0Id }, updateInfo, collectionName);

  res.json(updateInfo);
});

router.post("/verify-user", checkJWT, async (req, res) => {
  const auth0Id = req.auth.sub;
  const email = req.auth[`${process.env.AUTH0_AUDIENCE}email`];
  const name = req.auth[`${process.env.AUTH0_AUDIENCE}name`];

  const user = await readOne({ auth0Id: auth0Id }, collectionName);

  if (user) {
    res.json(user);
  } else {
    let addObject = {
      email: email,
      auth0Id: auth0Id,
      name: name,
      gender: "",
      bio: "",
    };
    const newUser = await addToDB(addObject, collectionName);
    res.json({ auth0Id: auth0Id });
  }
});

module.exports = router;
