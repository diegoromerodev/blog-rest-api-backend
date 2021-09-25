const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const censorEmail = require("../lib/censorEmail");
const passport = require("passport");
const jwtLib = require("jsonwebtoken");

exports.user_all_get = (req, res, next) => {
  User.find()
    .select("-password")
    .exec((err, users) => {
      if (err) return next(err);
      if (!users) return res.json("NO USERS");
      const usersCopy = [...users];
      res.json(usersCopy.map((user) => censorEmail(user._doc)));
    });
};

exports.user_create_post = [
  body("email", "Email is required.").trim().isEmail().escape(),
  body("password", "Password is required (6 chars min.)")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("first_name", "First name is required.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "Last name is required.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("secret_key", "Wrong key.")
    .trim()
    .equals(process.env.secret_key)
    .escape(),
  (req, res, next) => {
    const valErrors = validationResult(req);
    if (!valErrors.isEmpty()) {
      return res.status(400).json(valErrors);
    }

    const hashedPass = bcrypt.hashSync(req.body.password);

    new User({
      email: req.body.email,
      password: hashedPass,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
    }).save((err, data) => {
      if (err) return next(err);
      return res.json(data);
    });
  },
];

exports.user_get = (req, res, next) => {
  User.findById(req.params.userId)
    .select("-password")
    .exec((err, user) => {
      if (err) return next(err);
      if (!user) return next(400);
      const userCopy = Object.assign({}, user);
      return res.json(censorEmail(userCopy._doc));
    });
};

exports.login_post = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.status(400).json(user);
    res.json(jwtLib.sign(user._doc, process.env.secret_key));
  })(req, res, next);
};
