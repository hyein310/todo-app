const cors = require("cors");
const express = require("express");
const PORT = 8080;
const app = express();
const { sequelize } = require("./models");
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const serverPrefix = "/api-server";  // 사용자들이 url에 치는 주소랑 개발자들이 사용하는 서버 주소랑 다르게 함

// middle-ware : body-parser 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// route 설정
app.use(serverPrefix, indexRouter);
app.use(serverPrefix + "/user", userRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
      console.log("server is open!!");
    });
  })
  .catch((err) => {
    console.log(err);
  });