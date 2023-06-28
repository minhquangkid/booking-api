const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction");

router.post("/postBook", transactionController.postBook);
router.get("/transaction", transactionController.getTrans);
router.get("/dash", transactionController.getTrans);

module.exports = router;
