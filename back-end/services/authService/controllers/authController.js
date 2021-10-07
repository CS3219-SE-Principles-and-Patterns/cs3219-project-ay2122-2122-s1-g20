const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
const User = require("../model/user");
require("dotenv").config();

let transporter = nodemailer.createTransport(sendGridTransport({
  auth: {
    api_key: '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'
  },
 }));

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({message: "This email is already registered. Please login instead."});
    }

    const uniqueString = () => {
      const len = 8;
      let randStr = ''
      for (let i = 0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1);
        randStr += ch
      }
    }

    const user = new User({ email, username, password, uniqueString});
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);
    // res.status(200).json({token: token, message: "User successfully created!"});

    // link="http://"+req.get('host')+"/verify?id="+rand;

    let mailOptions={
      to : process.env.EMAIL,
      from: 'studybuddy@node-complete.com',
      subject: 'Verify your email address',
      html : `Click on this <a href=http://localhost:3000/verify/${uniqueString}> link </a> to verify your email!`
    }

     transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        res.status(400).json({message: "Email sending failed"});
      } else {
        console.log("== Message Sent ==");
        res.status(200).json({token: token, message: "User successfully created!"});
      }
    });
  } catch (err) {
    res.status(422).json({message: "Error with creating user."});
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Please provide an email and password." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({ message: "Invalid password or email entered." });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);
    res.status(200).json({token: token, message: "User successfully logged in!" });
  } catch (err) {
    return res.status(422).json({ message: "Invalid password or email entered." });
  }
};
