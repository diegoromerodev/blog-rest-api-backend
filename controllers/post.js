const { validationResult, body } = require("express-validator");
const Post = require("../models/post");
const passport = require("passport");

exports.posts_get = (req, res, next) => {
  Post.find()
    .populate("author", "first_name last_name full_name")
    .exec((err, posts) => {
      if (err) return next(err);

      return res.json(posts);
    });
};

exports.single_post_get = (req, res, next) => {
  Post.findById(req.params.postId)
    .populate("author", "first_name last_name full_name")
    .exec((err, post) => {
      if (err) return next(err);
      return res.json(post);
    });
};

exports.posts_post = [
  passport.authenticate("jwt", { session: false }),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("text", "Text is required").trim().isLength({ min: 1 }).escape(),
  body("readable", "Readability must be specified")
    .trim()
    .isIn(["true", "false"])
    .escape(),
  (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty() || !req.user) {
      return res.status(400).json(valErrors);
    }
    // VALIDATION PASSED
    new Post({
      author: req.user,
      title: req.body.title,
      text: req.body.text,
      readable: req.body.readable === "true",
    }).save((err, doc) => {
      if (err) return next(err);
      res.json(doc);
    });
  },
];

exports.single_post_put = [
  passport.authenticate("jwt", { session: false }),
  body("title", "Title is required").trim().isLength({ min: 1 }).escape(),
  body("text", "Text is required").trim().isLength({ min: 1 }).escape(),
  body("readable", "Readability must be specified")
    .trim()
    .isIn(["true", "false"])
    .escape(),
  (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty() || !req.user) {
      return res.status(400).json(valErrors);
    }
    // VALIDATION PASSED
    const postUpdates = {
      author: req.user,
      title: req.body.title,
      text: req.body.text,
      readable: req.body.readable === "true",
    };
    Post.findByIdAndUpdate(req.params.postId, postUpdates, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  },
];

exports.single_post_delete = [
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty() || !req.user) {
      return res.status(400).json(valErrors);
    }
    // VALIDATION PASSED
    Post.findByIdAndDelete(req.params.postId, (err, doc) => {
      if (err) return next(err);
      return res.json(doc);
    });
  },
];
