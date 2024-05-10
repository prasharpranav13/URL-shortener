const { getUser } = require("../service/auth");
const restrictToLoggedInUserOnly = (req, res, next) => {
  const userUid = req.cookies?.uid;
  //user isn't logged in otherwise uske pas uid hota cokie m
  if (!userUid) return res.redirect("/login");
  // console.log(req);
  const user = getUser(userUid);
  //wrong login id/pass->user doesn't exist
  if (!user) return res.redirect("/login");
  //otherwise validated
  req.user = user;
  next();
};
//this middleware is similar to above but less strict
//just for checking if it's logged in or not
const checkAuth = async (req, res, next) => {
  const userUid = req.cookies?.uid;
  const user = getUser(userUid);
  req.user = user;
  next();
};
module.exports = { restrictToLoggedInUserOnly, checkAuth };
