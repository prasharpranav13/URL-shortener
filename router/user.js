const express = require("express");
const router = express.Router();
const User = require("../models/user");

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
  const result = await User.findOne({ email, password });
  //not available
  if (!result) return res.render("login", { error: "user not found" });

  return res.redirect("/");
});

module.exports = router;
