process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");
const mongoose = require("mongoose");
const Group = require("../model/group");
const Message = require("../model/message");

chai.use(chaiHttp);
chai.should();
const testGroup = new Group({
  hashtag: "test",
  name: Math.random().toString(36).substr(2, 5),
  uid: ["test@gmail.com"],
  lastModified: 123,
  creator: "test@gmail.com",
  state: "available",
});

const testMessage = new Message({
  group_id: testGroup._id.toString(),
  sender: "test",
  email: "test@gmail.com",
  timestamp: 123,
  content: "hello",
  profilePic: "na",
});

describe("Groups", () => {
  describe("GET /groups", () => {
    // Test to get all groups
    it("should get all groups record", (done) => {
      chai
        .request(app)
        .get("/api/groups")
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("Create a new group", () => {
    it("should post a new group", (done) => {
      chai
        .request(app)
        .post("/api/groups")
        .send(testGroup)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Group successfully created!");
          done();
        });
    });

    //it should delete  the group with given id
    it("it should DELETE a group by the given id", (done) => {
      chai
        .request(app)
        .del("/api/groups/" + testGroup._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have
            .property("message")
            .eql("Group successfully deleted!");
          done();
        });
    });
  });
});

describe("Messages", () => {
  // Test to add a message
  it("should add a new messages record", (done) => {
    chai
      .request(app)
      .post("/api/messages/")
      .send(testMessage)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have
          .property("message")
          .eql("Message successfully sent!");
        done();
      });
  });
});
