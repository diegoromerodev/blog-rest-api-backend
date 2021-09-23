const router = require("express").Router();

router.get("/", function (req, res, next) {
  res.json("NOT IMPLEMENT GET ALL USERS");
});

router.post("/", function (req, res, next) {
  res.json("NOT IMPLEMENT POST NEW USER");
});

router.get("/:userId", function (req, res, next) {
  res.json("NOT IMPLEMENT GET SPECIFIC USER " + req.params.userId);
});

router.delete("/:userId", function (req, res, next) {
  res.json("NOT IMPLEMENT DELETE SPECIFIC USER " + req.params.userId);
});

module.exports = router;
