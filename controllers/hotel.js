const Transaction = require("../models/transaction");
const Hotel = require("../models/hotel");
const room = require("../models/room");
const { request } = require("express");

exports.getDetail = (req, res, next) => {
  // console.log(req.body);
  Hotel.findById(req.body.id)
    .then((data) => {
      // console.log(data)
      res.status(200).send(data);
    })
    .catch((err) => console.log(err));
};

exports.getRoom = (req, res, next) => {
  let list = [];
  async function roomArray(id) {
    const array = await Hotel.findById(id);

    await Promise.all(
      // phải đặt promise bao bên ngoài map
      array.rooms.map(async (item) => {
        const res = await room.findById(item);
        list.push(res);
      })
    );
    return list;
  }

  roomArray(req.body.id)
    .then((data) => {
      res.status(200).send({ listRoom: data });
    })
    .catch((err) => console.log(err));
};

exports.getHotelList = (req, res, next) => {
  Hotel.find({})
    .then((data) => res.status(200).send({ data }))
    .catch((err) => console.log(err));
};

exports.postDelete = (req, res, next) => {
  const idHotel = req.body.idHotel;
  console.log(idHotel);

  const checkHotel = async () => {
    // kiểm tra xem có nằm trong transaction nào ko ?
    const data = await Transaction.findOne({
      hotel: idHotel,
    });

    if (data) {
      console.log(data);
      res.send({ isOnTransaction: true });
    } else {
      console.log("ko có trong transaction");
      Hotel.findByIdAndDelete(idHotel)
        .then(() => {
          res.send({ isOnTransaction: false });
        })
        .catch((err) => console.log(err));
    }
  };
  checkHotel();
};

exports.searchHotel = (req, res, next) => {
  const request = req.body;
  // const start = new Date(request.date[0].startDate);
  // const end = new Date(request.date[0].endDate);
  console.log(request);
  const city = async () => {
    const cityArray = await Hotel.find({ city: request.destination });
    return cityArray;
  };

  city()
    .then((array) => {
      //   const list = array.filter((item) => {
      //     return new Date(item.dateEnd) < start || new Date(item.dateStart) > end;
      //   });

      res.send({ array });
    })
    .catch((err) => console.log(err));
};

exports.postHotel = (req, res, next) => {
  const data = req.body.final;
  const New = new Hotel({
    address: data.address,

    cheapestPrice: data.price,

    city: data.city,

    desc: data.des,

    distance: data.dis,

    featured: data.featured,

    name: data.name,

    photos: [data.imag],

    rooms: data.rooms,

    title: data.title,

    type: data.type,
  });
  console.log(New);
  New.save()
    .then(() => res.status(200).send({ status: true })) // phải send cái gì đó để FE biết được thành công, mặc dù FE ko dùng đến status: true
    .catch((err) => console.log(err));
};

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
