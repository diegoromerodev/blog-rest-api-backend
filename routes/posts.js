const router = require("express").Router();
const postController = require("../controllers/post");

router.get("/", postController.posts_get);
router.post("/", postController.posts_post);

router.get("/:postId", postController.single_post_get);

router.put("/:postId", postController.single_post_put);

router.delete("/:postId", postController.single_post_delete);

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
