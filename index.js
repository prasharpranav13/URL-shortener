// POST/URL-> generates short url
// GET/URL/:id-> redirects user to original url
// GET/URL/analytics/:id -> no of clicks of url
const express = require("express");
const URL = require("./models/url");
const PORT = 8001;
const app = express();

const router = require("./router/url");
const staticRoute = require("./router/staticRouter");
const userRoute = require("./router/user");

const connectMongodb = require("./connection");
const path = require("path");

connectMongodb("mongodb://localhost:27017/urlShortener");
app.use(express.json());
//to support form data as well
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", staticRoute);
app.use("/url", router);
app.use("/user", userRoute);

app.get("/url/:shortId", async (req, res) => {
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
  // res.redirect("https://" + entry.redirectUrl);
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log("server started");
});
