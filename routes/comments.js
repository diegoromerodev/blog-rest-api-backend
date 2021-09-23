const router = require("express").Router;

router.get("/", function (req, res, next) {
  res.json("NOT IMPLEMENTED GET ALL COMMENTS FROM POST " + req.params.postId);
});

router.post("/", function (req, res, next) {
  res.json("NOT IMPLEMENTED POST NEW COMMENT ON POST " + req.params.postId);
});

router.get("/:commentId", function (req, res, next) {
  res.json(
    "NOT IMPLEMENTED GET SPECIFIC COMMENT FROM POST " +
      req.params.postId +
      " COMMENT " +
      req.params.commentId
  );
});

module.exports = router;
