const mongoose = require("mongoose");
const Room = require("./room");

const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  address: { type: String, required: true },

  cheapestPrice: { type: Number, required: true },

  city: { type: String, required: true },

  desc: { type: String, required: true },

  distance: { type: String, required: true },

  featured: { type: Boolean, required: true },

  name: { type: String, required: true },

  photos: { type: Array, required: true },

  rooms: { type: Array, required: true },

  title: { type: String, required: true },

  type: { type: String, required: true },
});

// hotelSchema.methods.listRoom = function (id) {
//   // const thisHotel = await this.findById(id); // lấy ra khách sạn đang chọn
//   // async function identifyRoom(hotel) {
//   //   let list = [];
//   //   await hotel.rooms.map((item) => {
//   //     Room.findById(item)
//   //       .then((data) => list.push(data))
//   //       .catch((err) => console.log(err));
//   //   });
//   // }
//   // return identifyRoom(thisHotel);

//   return { hotelModel: id };

//   // return this.save();
// };

module.exports = mongoose.model("Hotel", hotelSchema); // tạo collection, mongoose tự động viết thường và thêm chữ s vào thành 'users'
