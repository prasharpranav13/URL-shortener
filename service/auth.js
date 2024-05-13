const jwt = require("jsonwebtoken");
const secretKey = "#**13AsHu";

// Generate JWT for a user
const setUser = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
  };
  return jwt.sign(payload, secretKey);
};

// Verify JWT and extract user information
const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = { setUser, getUser };
