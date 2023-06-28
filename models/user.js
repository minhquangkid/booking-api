const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // tạo collection users
  username: { type: String, required: true }, // bắt buộc vì trong đăng nhập có
  password: {
    type: String,
    required: true, // bắt buộc vì trong đăng nhập có
  },
  fullName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: Number,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  idCard: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  isLogIn: {
    type: Boolean,
    required: true,
  }, // nên thêm 1 thuộc tính chứa id của các transaction mà người dùng thực hiện vào trong user này vì 1 người dùng có thể đặt phòng cùng lúc ở nhiều khách sạn

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

module.exports = mongoose.model("User", userSchema); // tạo collection, mongoose tự động viết thường và thêm chữ s vào thành 'users'
