process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const Session = require("../model/session");
const app = require("../server");

chai.use(chaiHttp);
chai.should();

const testSession = new Session({
  capacity: 4,
  title: "testing",
  timeLimit: 1000,
  time: {
    start: "start",
    end: "end",
  },
  date: "10 January 2022",
  module: "mod",
  participants: ["one"],
  isOnline: "online",
});

describe("Sessions", () => {
  describe("Managing sessions /", () => {
    // Test create a new session
    it("should post a new session", (done) => {
      chai
        .request(app)
        .post("/api/session")
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
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should delete a session", (done) => {
      chai
        .request(app)
        .del("/api/session/" + testSession._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("You have deleted this study session!");
          done();
        });
    });
  });
});
