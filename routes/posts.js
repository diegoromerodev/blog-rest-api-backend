const router = require("express").Router();
const postController = require("../controllers/post");
const commentController = require("../controllers/comment");

router.get("/", postController.posts_get);
router.post("/", postController.posts_post);

router.get("/:postId", postController.single_post_get);

router.put("/:postId", postController.single_post_put);

router.delete("/:postId", postController.single_post_delete);

router.get("/:postId/comments", commentController.comments_get);

router.post("/:postId/comments", commentController.comments_post);

router.get(
  "/:postId/comments/:commentId",
  commentController.single_comment_get
);

router.delete(
  "/:postId/comments/:commentId",
  commentController.single_comment_delete
);
router.put(
  "/:postId/comments/:commentId",
  commentController.single_comment_put
);

module.exports = router;
