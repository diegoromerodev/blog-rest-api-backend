const router = require("express").Router();
const userController = require("../controllers/user");
const User = require("../models/user");

router.get("/", userController.user_all_get);

router.post("/", userController.user_create_post);

router.get("/:userId", function (req, res, next) {
  res.json("NOT IMPLEMENT GET SPECIFIC USER " + req.params.userId);
});

router.delete("/:userId", function (req, res, next) {
  res.json("NOT IMPLEMENT DELETE SPECIFIC USER " + req.params.userId);
});

module.exports = router;
