const Transaction = require("../models/transaction");
const Room = require("../models/room");
const User = require("../models/user");

// ta nên tạo 1 module.exports để xuất ra 1 phương thức lấy thông tin người đang đăng nhập, để tái sử dụng nó bất kì đâu
exports.postBook = (req, res, next) => {
  console.log(req.body);
  const data = req.body.inf;

  User.updateOne(
    // cập nhật user
    { username: data.username },
    {
      fullName: data.fullName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      idCard: data.idCard,
    }
  )
    .then()
    .catch((err) => console.log(err));

  console.log(new Date(data.dateEnd));
  console.log(new Date());

  let statusNow;
  if (new Date(data.dateEnd) < new Date()) {
    // console.log("booked");
    statusNow = "Check out";
  } else if (new Date(data.dateStart) > new Date()) {
    statusNow = "Booked";
  } else {
    statusNow = "Check in";
  }

  const transaction = new Transaction({
    user: data.username,
    hotel: data.idHotel,
    room: data.roomArray,
    dateStart: data.dateStart,
    dateEnd: data.dateEnd,
    price: data.price,
    payment: data.payMethod,
    status: statusNow,
  });
  transaction
    .save()
    .then()
    .catch((err) => console.log(err));
};

exports.getTrans = (req, res, next) => {
  Transaction.find()
    .populate("hotel")
    .exec(function (err, data) {
      if (err) return handleError(err);
      // console.log("result", result);
      // nó sẽ trả về array đầy đủ của transaction và cả thông tin đầy đủ của khách sạn
      // nếu muốn dùng promise then() mà ko dùng callback function như trên thì dùng .execPopulate()
      res.status(200).send({ data });
    });
};

// exports.getDash = (req, res, next) => {
//   Transaction.find({})
//     .then((result) => res.status(200).send({ result }))
//     .catch((err) => console.log(err));
// };

// exports.getRoom = (req, res, next) => {
//   let list = [];
//   async function roomArray(id) {
//     const array = await Hotel.findById(id);

//     await Promise.all(
//       // phải đặt promise bao bên ngoài map
//       array.rooms.map(async (item) => {
//         const res = await room.findById(item);
//         list.push(res);
//       })
//     );
//     return list;
//   }

////////////
// exports.getCart = (req, res, next) => {
//   req.user
//     .populate("cart.items.productId") // thử bật tắt cái này và xem console.log để thấy khác biệt, kết hợp với xem giao diện Cart trên web
//     .execPopulate() // vì populate ko trả về promise (nếu chỉ dùng mình nó) nên ko chạy then được, ta phải có execPopulate(). Và req.user cũng ko phải là promise, nên có thể console.log(req.user) hoặc muốn dùng then thì phải có .execPopulate()
//     .then((user) => {
//       console.log("đây là user : ", user); // đây là giá trị của req.user
//       console.log("đây là user.cart.items : ", user.cart.items); // nếu tắt .populate("cart.items.productId") đi thì nó sẽ hiện ra như đúng trong database users nhưng nếu bật lên thì ta có thể lấy ra thêm các thông tin liên kết của .productId trong cart.items.productId
//       const products = user.cart.items;
//       res.render("shop/cart", {
//         path: "/cart",
//         pageTitle: "Your Cart",
//         products: products,
//       });
//     })
//     .catch((err) => console.log(err));
// };
