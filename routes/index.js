const express = require("express");
const router = express.Router();
const postsRouter = require("./posts");
const usersRouter = require("./users");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json("NOT IMPLEMENTED API HOME");
});

router.use("/posts", postsRouter);
router.use("/users", usersRouter);

module.exports = router;
