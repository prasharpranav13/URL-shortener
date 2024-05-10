const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
//handle User signup
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name: name,
    email: email,
    password: password,
  });
  //return res.render("home")
  return res.redirect("/");
});
//hanldle user login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  //not available
  if (!user) return res.render("login", { error: "user not found" });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  //cookie name-> uid
  res.cookie("uid", sessionId);
  return res.redirect("/");
});

module.exports = router;
