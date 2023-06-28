const express = require("express");

const hotelController = require("../controllers/hotel");
const router = express.Router();

router.post("/detail", hotelController.getDetail);
router.post("/getRoom", hotelController.getRoom);
router.post("/list/postHotel", hotelController.searchHotel);

//// nhận từ admin
router.get("/admin/hotelList", hotelController.getHotelList);
router.post("/admin/hotelList/deleteHotel", hotelController.postDelete);
router.post("/admin/postHotel", hotelController.postHotel);

module.exports = router;
