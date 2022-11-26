const express = require("express");
const router = express.Router();
const { requiresAuth } = require("express-openid-connect");

router.get("/profile", requiresAuth(), async (req, res) => {
  //res.send(JSON.stringify(req.oidc.user));
  const auth0Id = req.oidc;
  console.log(auth0Id);
  //const user = await prisma.user.findUnique({
  //  where: {
  //    auth0Id,
  //  },
  //});
  res.send(JSON.stringify(req.oidc.user));
  //if (user) {
  //  res.json(user);
  //} else {
  //  res.status(404).send("User not found");
  //}
});

module.exports = router;
