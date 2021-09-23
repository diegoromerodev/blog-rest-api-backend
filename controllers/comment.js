const { validationResult, body } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");

exports.comments_get = (req, res, next) => {
  Comment.find().exec((err, comments) => {
    if (err) return next(err);

    return res.json(comments);
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
