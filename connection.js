const mongoose = require("mongoose");
const connectMongodb = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log(`mongodb connected`);
    })
    .catch((err) => {
      console.log("error mongodb not connected");
    });
};
module.exports = connectMongodb;
