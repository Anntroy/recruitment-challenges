const { Router } = require("express");
const router = Router();

router.get("/health", function (req, res) {
  res.body = "Up and running";
  // QUESTION: why this endpoint blocks the app?
  // Because we are not sending any response from this endpoint. We can solve it using res.send("Response") or res.json({ error: "Bad request" });
});

module.exports = router;
