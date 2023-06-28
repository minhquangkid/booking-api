const fs = require("fs");
const path = require("path");
const author = (req, res, next) => {
  const user = req.query.user;
  const token = req.query.token;
  const userList = JSON.parse(
    fs.readFileSync(
      path.join(
        path.dirname(process.mainModule.filename),
        "data",
        "userToken.json"
      ),
      "utf8"
    )
  );
  const check = userList.find((item) => {
    return item.userId === user && item.token === token;
  });
  if (check) {
    return next(); // dùng return để thoát khỏi function author (ko dùng cũng dc)
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
};
module.exports = author;
