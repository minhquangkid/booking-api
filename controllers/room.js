const Transaction = require("../models/transaction");
const Room = require("../models/room");

exports.getRoomList = (req, res, next) => {
  Room.find({})
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteRoom = (req, res, next) => {
  const idRoom = req.body.idRoom;
  console.log(idRoom);

  const getTransaction = async () => {
    const array = await Transaction.find();
    return array;
  };

  getTransaction().then((data) => {
    let checkRoom = false;
    data.map((item) => {
      item.room.map((e) => {
        if (e.roomType == idRoom) {
          checkRoom = true;
        }
      });
    });
    if (checkRoom === true) {
      res.send({ isOnTransaction: true });
    } else {
      Room.findByIdAndDelete(idRoom)
        .then(() => {
          res.send({ isOnTransaction: false });
        })
        .catch((err) => console.log(err));
    }
  });
};

exports.postRoom = (req, res, next) => {
  const data = req.body.final;
  const New = new Room({
    desc: data.des,
    maxPeople: data.maxPeople,
    price: data.price,
    roomNumbers: data.rooms,
    title: data.title,
  });
  //   console.log(New);
  New.save()
    .then(() => res.status(200).send({ status: true })) // phải send cái gì đó để FE biết được thành công, mặc dù FE ko dùng đến status: true
    .catch((err) => console.log(err));
};

//const checkRoom = async () => {
// kiểm tra xem có nằm trong transaction nào ko ?
//     const data = await Transaction.findOne({
//       hotel: idRoom,
//     });
//     if (data) {
//       console.log(data);
//       res.send({ isOnTransaction: true });
//     } else {
//       console.log("ko có trong transaction");
//       Hotel.findByIdAndDelete(idHotel)
//         .then(() => {
//           res.send({ isOnTransaction: false });
//         })
//         .catch((err) => console.log(err));
//     }
//   };
//   checkHotel();
