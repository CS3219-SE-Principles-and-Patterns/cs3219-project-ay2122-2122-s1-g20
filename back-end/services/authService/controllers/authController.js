const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const sendgridTransport = require('nodemailer-sendgrid-transport');
require("dotenv").config();
const User = require("../model/user");

const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENTID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

async function sendVerificationMail(uniqueString, email) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'studybuddycs3219@gmail.com',
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

     const result = await transporter.sendMail({
      to: email,
      subject: 'Please verify your email for your StudyBuddy account.',
      html: `
        <p>Please verify your study buddy account!</p>
        <p>Click this <a href="http://localhost:3000/signup/confirmation/verified/${uniqueString}">link</a> to verify your email.</p>
      `
    });
    console.log(result);
  } catch (error) {
    return error;
  }
}


exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).json({message: "This email is already registered. Please login instead."});
    }

    var uniqueString = crypto.randomBytes(20).toString('hex');
    
    const user = new User({ email, username, password, uniqueString });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);

    sendVerificationMail(uniqueString, email);

    return res.status(200).json({token: token, message: "User successfully created!"});
  } catch (err) {
    return res.status(422).json({message: "Error with creating user."});
  }
  
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ message: "Please provide an email and password." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(422).json({ message: "This email is not registered with us." });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY);
    // Check that email is verified before logging in
    if (user.isVerified === false) {
      return res.status(422).json({ message: "Your account is not yet verified." });
    } else {
      return res.status(200).json({token: token, message: "User successfully logged in!" });
    }
  } catch (err) {
    return res.status(422).json({ message: "Invalid password or email entered." });
  }
};

exports.postReset = (req, res, next) => { 
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
      const accessToken = oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: 'studybuddycs3219@gmail.com',
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
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
      res.status(422).json({message: "There is an error with sending email!"});
    })
  })
}

exports.postVerifyEmail = (req, res, next) => {
  const uniqueString = req.body.uniqueString;
  User.findOne({
    uniqueString: uniqueString
  }).then(
    user => {
        user.isVerified = true;
        return user.save();
    }).then(result => {
      res.status(200).json({message: "Your email is verified!"});
    })
    .catch(err => {
      res.status(422).json({message: "There is an error with verifying your account!"});
    });
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
