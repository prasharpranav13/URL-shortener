// POST/URL-> generates short url
// GET/:id-> redirects user to original url
// GET/URL/analytics/:id -> no of clicks of url
const express = require("express");
const mongoose = require("mongoose");
const URL = require("./models/url");
const PORT = 8001;
const app = express();
const router = require("./router/url");
const connectMongodb = require("./connection");
connectMongodb("mongodb://localhost:27017/urlShortener");
app.use(express.json());
app.use("/url", router);
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      //insert value in array
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  // console.log(entry);
  // console.log(entry.redirectUrl);
  //if you are entering www.google.com
  //as while searching https:// needed in search engine
  res.redirect("https://" + entry.redirectUrl);
});
app.listen(PORT, () => {
  console.log("server started");
});
