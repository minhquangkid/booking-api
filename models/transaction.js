const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  // tạo collection users
  user: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
  room: [
    // là 1 mảng vì người dùng có thể đặt nhiều loại phòng với nhiều số phòng ứng với từng loại trong 1 cái hotel
    {
      listNumber: { type: Array, required: true },
      roomType: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
    },
  ],
  dateStart: {
    type: Date,
    required: true,
  },
  dateEnd: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },

  //   cart: {
  //     items: [
  //       {
  //         productId: {
  //           type: Schema.Types.ObjectId,
  //           ref: "Product",
  //           required: true,
  //         },
  //         quantity: { type: Number, required: true },
  //       },
  //     ],
  //   },
});
// ref là để productId tham chiếu lấy đúng id của collection product, đây là cách nhúng

// userSchema.methods.addToCart = function (product) {
//   const cartProductIndex = this.cart.items.findIndex((cp) => {
//     return cp.productId.toString() === product._id.toString();
//   });
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];

//   if (cartProductIndex >= 0) {
//     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: product._id,
//       quantity: newQuantity,
//     });
//   }
//   const updatedCart = {
//     items: updatedCartItems,
//   };
//   this.cart = updatedCart;
//   return this.save();
// };

// userSchema.methods.removeFromCart = function (productId) {
//   const updatedCartItems = this.cart.items.filter((item) => {
//     return item.productId.toString() !== productId.toString();
//   });
//   this.cart.items = updatedCartItems;
//   return this.save();
// };

// userSchema.methods.clearCart = function () {
//   this.cart = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model("Transaction", transactionSchema); // tạo collection, mongoose tự động viết thường và thêm chữ s vào thành 'users'
