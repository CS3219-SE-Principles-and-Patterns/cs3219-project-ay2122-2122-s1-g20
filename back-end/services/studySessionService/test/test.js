process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const Session = require("../model/session");
const app = require("../server");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../model/user");

chai.use(chaiHttp);
chai.should();

const testSession = new Session({
  capacity: 4,
  title: "testing",
  timeLimit: 2,
  time: {
    start: "11:00",
    end: "13:00",
  },
  date: "2022-01-02",
  module: "CS3219",
  participants: ["me"],
  isOnline: "online",
});

describe("Sessions", () => {
  const jwtSalt = bcrypt.genSaltSync(10);
  const uniqueString = crypto.randomBytes(20).toString("hex");
  const newUser = new User({
    email: "test@gmail.com",
    username: "test",
    password: "123456",
    groups: [],
    jwtSalt: jwtSalt,
    uniqueString: uniqueString,
    isVerified: true,
  });
  const token = jwt.sign(
    { userId: newUser._id },
    process.env.TOKEN_KEY + jwtSalt
  );

  describe("Managing sessions /", () => {
    // Test create a new session
    it("should post a new session", (done) => {
      chai
        .request(app)
        .post("/api/session")
        .set("x-access-token", token)
        .set("jwt-salt", jwtSalt)
        .send(testSession)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("You have created a new study session!");
          done();
        });
    });

    it("should get joined session", (done) => {
      chai
        .request(app)
        .get("/api/session/joined/" + "test")
        .set("x-access-token", token)
        .set("jwt-salt", jwtSalt)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should delete a session", (done) => {
      chai
        .request(app)
        .del("/api/session/" + testSession._id)
        .set("x-access-token", token)
        .set("jwt-salt", jwtSalt)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("You have deleted this study session!");
          done();
        });
    });
  });
  after(function () {
    User.findByIdAndRemove(newUser._id).exec();
  });
});
