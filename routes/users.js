const router = require("express").Router();
const userController = require("../controllers/user");

router.get("/", userController.user_all_get);

router.post("/", userController.user_create_post);

router.get("/:userId", userController.user_get);

router.post("/login", userController.login_post);

module.exports = router;
