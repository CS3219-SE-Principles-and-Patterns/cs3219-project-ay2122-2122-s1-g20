const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
require("dotenv").config();

const User = require("../model/user");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
 });


exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({message: "This email is already registered. Please login instead."});
    }

    const user = new User({ email, username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);
    res.status(200).json({token: token, message: "User successfully created!"});
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


exports.postReset = (req, res, next) => { // Email verification for sending password reset link
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.status(422).json({ message: "Error generating bytes." });
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email}).then(
      user => {
        if (!user) {
          return res.status(422).json({ message: "No account with this email found." });
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      }
    ).then(result => {
      transporter.sendMail({
        to: req.body.email,
        subject: 'Password reset',
        html: `
          <p>You requested a password reset for your StudyBuddy account!</p>
          <p>Click this <a href="http://localhost:3000/resetPassword/${token}">link</a> to set a new password.</p>
        `
      })
      console.log(token);
      res.status(200).json({token: token, message: "Reset password email sent!"});
    })
    .catch(err => {
      console.log(err);
      res.status(422).json({message: "Error with resetting password."});
    })
  })
}

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const passwordToken = req.body.token;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then(user => {
      resetUser = user;
      return newPassword
    })
    .then(pw => {
      resetUser.password = pw;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
      res.status(200).json({message: "Password reset successful!"});
    })
    .catch(err => {
      res.status(422).json({message: "Your token is invalid or has expired."});
    });
};
