const express = require("express");

const RoomController = require("../controllers/room");
const router = express.Router();

//// nhận từ admin
router.get("/admin/roomList", RoomController.getRoomList);
router.post("/admin/roomList/deleteRoom", RoomController.postDeleteRoom);
router.post("/admin/postRoom", RoomController.postRoom);

module.exports = router;
