const URL = require("../models/url");
const shortid = require("shortid"); //package to get shortid
const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json(`Err: url is required`);
  const shortId = shortid();
  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.json({ id: shortId });
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    TotalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};
module.exports = { handleGenerateNewShortUrl, handleGetAnalytics };
