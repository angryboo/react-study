"use strict";

// http 서버를 사용할 수 있게 도와주는 패키지
const http = require("http");
// express의 모든 기능을 사용할 수 있게 해주는 패키지
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const mainRouter = require("./router/mainRouter");
const userRouter = require("./router/userRouter");

const db = require("./model/db");

//실제 실행될 AppServer는 http의 Server(서버 기능을 갖고 있는 클래스)를 상속받습니다
class AppServer extends http.Server {
  //실행될 때 config를 전달해줘서, 기타 다른 설정 사항이 존재하면 이 옵션을 이용합니다
  constructor(config) {
    //express의 모든 기능을 app에 담습니다
    const app = express();
    //이 클래스는 app, 즉 express 상위 객체를 호출하여 사용합니다.
    super(app);
    this.config = config;
    this.app = app;

    //동시성 처리를 위한 준비 코드인데, 후반부에 설명이 들어갑니다.
    this.currentConns = new Set();
    this.busy = new WeakSet();
    this.stop = false;
  }
  //실제로 이 클래스가 실행되는 실행 함수 부분입니다.
  //여기엔 수많은 app 설정 코드들이 존재하게됩니다.
  start() {
    this.set();
    this.middleWare();
    this.router();
    this.app.use("/public", express.static(__dirname + "/public"));
    this.dbConnection();
    return this;
  }
  set() {
    this.app.engine("html", require("ejs").renderFile);
    this.app.set("views", __dirname + "/views");
    this.app.set("view engine", "html");
  }
  middleWare() {
    this.app.use(helmet());
    this.app.use(bodyParser());
    this.app.use(cookieParser());
    this.app.use((req, res, next) => {
      console.log("미들웨어");
      next();
    });
  }
  router() {
    this.app.use("/", mainRouter);
    this.app.use("/user", userRouter);
    this.app.use((req, res, next) => {
      res.status(404);
      res.send("잘못된 요청입니다");
    });
  }

  dbConnection() {
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("디비 접속 완료");
        return db.sequelize.sync({ force: false });
      })
      .then(() => {
        console.log("디비 접속 완료된 다음 할 일");
      })
      .catch((err) => {
        console.log("디비 접속 실패");
        console.log(err);
      });
  }
}

const createServer = (config = {}) => {
  //위에서 정의한 클래스를 생성하고 클래스 안에 있는 start
  //즉, 정의한 클래스를 동작 시킬 함수를 반환해줍니다.
  const server = new AppServer();
  return server.start();
};

//애플리케이션(app) 설정 부분과 실행부분을 나누기 위해
//설정 부분인 이 클래스를 내보냅니다.
exports.createServer = createServer;
