const { validationResult, body } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.comments_get = (req, res, next) => {
  Comment.find()
    .where("post")
    .equals(req.params.postId)
    .exec((err, comments) => {
      if (err) return next(err);
      return res.json(comments);
    });
};

exports.single_comment_get = (req, res, next) => {
  Comment.findById(req.params.commentId)
    .where("post")
    .equals(req.params.postId)
    .exec((err, comment) => {
      if (err) return next(err);
      if (!comment) return res.json("NO COMMENT FOUND");
      return res.json(comment);
    });
};

exports.comments_post = [
  body("author", "Author is required").trim().isLength({ min: 1 }).escape(),
  body("text", "Text is required").trim().isLength({ min: 1 }).escape(),
  (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return res.status(400).json(valErrors);
    }
    // VALIDATION PASSED
    Post.findById(req.params.postId).exec((err, post) => {
      if (!post) return res.status(404).json("POST NOT FOUND");
      new Comment({
        post,
        author: req.body.author,
        text: req.body.text,
      }).save((err, doc) => {
        if (err) return next(err);
        res.json(doc);
      });
    });
  },
];
