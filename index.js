// POST/URL-> generates short url
// GET/URL/:id-> redirects user to original url
// GET/URL/analytics/:id -> no of clicks of url
const express = require("express");
const URL = require("./models/url");
const PORT = 8001;
const app = express();
const cookieParser = require("cookie-parser");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");
const { checkAuth } = require("./middlewares/auth");
const router = require("./router/url");
const staticRoute = require("./router/staticRouter");
const userRoute = require("./router/user");

const connectMongodb = require("./connection");
const path = require("path");

connectMongodb("mongodb://localhost:27017/urlShortener");
app.use(express.json());
//to support form data as well
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); //to parse and use cookies

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/", checkAuth, staticRoute);
//to perform any action on /url you must be logged in
app.use("/url", restrictToLoggedInUserOnly, router);
app.use("/user", checkAuth, userRoute);

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
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => {
  console.log("server started");
});
