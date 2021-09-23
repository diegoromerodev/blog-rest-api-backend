const router = require("express").Router();

router.get("/", function (req, res, next) {
  res.json("NOT IMPLEMENTED GET ALL POSTS");
});
router.post("/", function (req, res, next) {
  res.json("NOT IMPLEMENTED POST NEW POSTS");
});

router.get("/:postId", function (req, res, next) {
  res.json("NOT IMPLEMENTED GET ONE POST " + req.params.postId);
});

router.put("/:postId", function (req, res, next) {
  res.json("NOT IMPLEMENTED UPDATE ONE POST " + req.params.postId);
});

router.delete("/:postId", function (req, res, next) {
  res.json("NOT IMPLEMENTED DELETE ONE POST " + req.params.postId);
});

router.get("/:postId/comments", function (req, res, next) {
  res.json("NOT IMPLEMENTED GET ALL COMMENTS FROM POST " + req.params.postId);
});

router.post("/:postId/comments", function (req, res, next) {
  res.json("NOT IMPLEMENTED POST NEW COMMENT ON POST " + req.params.postId);
});

router.get("/:postId/comments/:commentId", function (req, res, next) {
  res.json(
    "NOT IMPLEMENTED GET SPECIFIC COMMENT FROM POST " +
      req.params.postId +
      " COMMENT " +
      req.params.commentId
  );
});

module.exports = router;
