const express = require("express");

const homeController = require("../controllers/home");
const router = express.Router();

router.post("/sign", homeController.postSign);

router.post("/login", homeController.postLogIn);

router.post("/logout", homeController.postLogOut);

router.get("/center", homeController.getCenter);

////
router.post("/admin/login", homeController.postLogIn);
router.post("/admin/logout", homeController.postLogOut);

module.exports = router;
