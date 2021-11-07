process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require('../model/user');


chai.use(chaiHttp);
chai.should();


describe("TEST", () => {

    const jwtSalt = bcrypt.genSaltSync(10);
    const uniqueString = crypto.randomBytes(20).toString("hex");
    const newUser = new User({email: "test@gmail.com", username: "test", password: "123456" , groups:[], jwtSalt: jwtSalt, uniqueString: uniqueString, isVerified: true})
    const token = jwt.sign(
      { userId: newUser._id },
      process.env.TOKEN_KEY + jwtSalt
    );

    it("should get a user's groups", (done) => {
        newUser.save((err, user) => {
            chai.request(app)
                    .get('/api/user/account/groups/' + 'test@gmail.com')
                    .set('x-access-token', token)
                    .set('jwt-salt', jwtSalt)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Groups successfully loaded!');
                        done();
                });
        });
    });

    it("should not be allowed to get a user's groups", (done) => {
        chai.request(app)
                .get('/api/user/account/groups/' + 'test@gmail.com')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('error').eql("You must be logged in.");
                    done();
                });
    });

    it('it should log a user in', (done) => {
        let user = {
            email: "test@gmail.com",
            password: '123456'
        }
        chai.request(app)
            .post('/api/user/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("User successfully logged in!");
                res.body.should.have.property('user');
                res.body.should.have.property('token');
                done();
            });
    });

    it('it should add a group to a user', (done) => {
        const addition = {
            email: "test@gmail.com",
            groupId: "qazwsxedcrfv"
        }
        chai.request(app)
            .post('/api/user/account/groups')
            .set('x-access-token', token)
            .set('jwt-salt', jwtSalt)
            .send(addition)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('User updated');
                res.body.should.have.property('user');
                done();
            });
    });

    it('it should add modules to a user', (done) => {
        const addition = {
            modules: ["CS3219"]
        }
        chai.request(app)
            .post('/api/profile/modules')
            .set('x-access-token', token)
            .set('jwt-salt', jwtSalt)
            .send(addition)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('success');
                done();
            });
    });

    after(function() {
        User.findByIdAndRemove(newUser._id).exec();
      });
});
