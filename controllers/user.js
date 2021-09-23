const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.user_all_get = (req, res, next) => {
  User.find()
    .select("-password")
    .exec((err, users) => {
      if (err) return next(err);
      if (!users) return res.json("NO USERS");
      const usersCopy = [...users];
      const censoredEmails = usersCopy.map((user) => {
        // CENSOR EMAILS FOR PRIVACY
        const emailSplit = user.email.split("@");
        let username = emailSplit[0].split("");
        username.splice(1, 6, ["..."]);
        username = username.join("");
        user.email = username + "@" + emailSplit[1];
        return user;
      });
      res.json(censoredEmails);
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
      first_name: req.body.password,
      last_name: req.body.last_name,
    }).save((err, data) => {
      if (err) return next(err);
      return res.json(data);
    });
  },
];
