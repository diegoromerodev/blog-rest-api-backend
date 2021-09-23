const router = require("express").Router;
const commentsRouter = require("./comments");

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

router.use("/:postId/comments", commentsRouter);

module.exports = router;
