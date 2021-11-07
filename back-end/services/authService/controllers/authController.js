const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../model/user");

const CLIENT_ID =
  "683134824367-ik7dnbigqoiqr5plf35lgkmnhjlo1arl.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  "1//048qX2wDcetOGCgYIARAAGAQSNwF-L9IrstcyboGZNxRGVtcIqun9IJvXQCqEQU863jcFOjXqZgPjuuki4iwuOk9FcXg6SrlqRIM";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

google.options({ auth: oAuth2Client }); // Apply the settings globally

exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  const jwtSalt = bcrypt.genSaltSync(10);

  try {
    const test_user = await User.findOne({ email });
    if (test_user) {
      return res
        .status(409)
        .json({ message: "This email is already registered." });
    }

    const uniqueString = crypto.randomBytes(20).toString("hex");
    const user = new User({
      email,
      username,
      password,
      uniqueString,
      jwtSalt,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_KEY + jwtSalt
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
    console.log("Access token: %s", accessToken.toString());

    const mailOptions = {
      to: email,
      subject: "Please verify your email for your StudyBuddy account!",
      html: `
        <p>Please verify your study buddy account!</p>
        <p>Click this <a href="http://localhost:3000/signup/confirmation/verified/${uniqueString}">link</a> to verify your email.</p>
      `,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "studybuddycs3219@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    const result = await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log(err);
      }

      console.log("Message sent: %s", info.message);
      console.log("Message URL: %s", nodemailer.getTestMessageUrl(info));
    });

    await user.save();

    console.log(result);

    return res.status(200).json({
      result: result,
      token: token,
      message: "Please wait to be redirected...",
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: "Error with sign up." });
  }
};

exports.checkToken = (req, res, next) => {
  let auth = false;
  const token = req.headers["x-access-token"];
  const salt = req.headers["jwt-salt"];

  if (!token || !salt) {
    return res.status(400).json({ message : "Please login!" });
  }

  try {
    if (!jwt.verify(token, process.env.TOKEN_KEY + salt))
      return res.status(400).json("Invalid token!");
    else {
      auth = true;
    }
  } catch (error) {
    console.log("Invalid token!");
  }

  if (!auth) {
    return res.status(400).json({ message: "Token verification failed!" });
  } else {
    const data = jwt.verify(token, process.env.TOKEN_KEY + salt);
    User.findById(data.userId).exec((err, user) => {
      if (err || !user) {
        return res.status(400).json({ error: "User not found!" });
      }

      const {
        username,
        email,
        modules,
        profilePic,
        jwtSalt
      } = user;

      return res.status(200).json({
        user: {
          username,
          email,
          modules,
          profilePic,
          jwtSalt
        },
        token : {
          token
        }
      });
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "Please provide an email and password." });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res
      .status(422)
      .json({ message: "This email is not registered with us." });
  }

  try {
    await user.comparePassword(password);
    const jwtSalt = user.jwtSalt;
    const token = jwt.sign(
      { userId: user._id },
      process.env.TOKEN_KEY + jwtSalt
    );

    if (user.isVerified === false) {
      return res
        .status(422)
        .json({ message: "Your account is not yet verified." });
    } else {
      return res
        .status(200)
        .json({ user, token: token, message: "User successfully logged in!" });
    }
  } catch (err) {
    return res
      .status(422)
      .json({ message: "Invalid password or email entered." });
  }
};

exports.logout = async (req, res) => {
  const { email } = req.body;
  try {
    const newSalt = bcrypt.genSaltSync(10);
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { jwtSalt: newSalt },
      { new: true }
    );
    return res
      .status(200)
      .json({ user: updatedUser, message: "Salt changed upon logout" });
  } catch (err) {
    return res.status(422).json({ message: "Error logging out" });
  }
};

exports.updatePassword = async (req, res) => {
  const { oldpassword, newpassword, confirmNewpassword } = req.body;
  const user = await User.findOne({ email: req.body.email.email });

  if (!oldpassword || !newpassword || !confirmNewpassword) {
    return res
      .status(200)
      .json({ message: "Please provide an input", valid: false });
  } else if (newpassword !== confirmNewpassword) {
    return res
      .status(200)
      .json({ message: "The new passwords do not match", valid: false });
  } else {
    try {
      console.log(user);
      await user.comparePassword(oldpassword);
    } catch (err) {
      return res
        .status(200)
        .json({ message: "Old password did not match", valid: false });
    }

    try {
      User.findOne({ email: req.body.email.email })
        .then((user) => {
          user.password = newpassword;
          return user.save();
        })
        .then((result) => {
          return res
            .status(200)
            .json({ message: "Password changed successful!", valid: true });
        });
    } catch (err) {
      return res.status(200).json({
        message:
          "Invalid password entered. Check that you entered the right passwords",
        valid: false,
      });
    }
  }
};

exports.updateEmail = async (req, res) => {
  const { edit, email } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { email: edit },
      { new: true }
    );

    return res
      .status(200)
      .json({ user: updatedUser, message: "Updated user email" });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: "Error updating email" });
  }
};

exports.updateUsername = async (req, res) => {
  const { email, newUsername } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      { username: newUsername },
      { new: true }
    );

    return res
      .status(200)
      .json({ user: updatedUser, message: "Updated username" });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ message: "Error updating username" });
  }
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      return res.status(422).json({ message: "Error generating bytes." });
    } else {
      const token = buffer.toString("hex");
      User.findOne({ email: req.body.email })
        .then((user) => {
          if (!user) {
            throw new Error("No account with this email found.");
          } else {
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
          }
        })
        .then((result) => {
          oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
          const accessToken = oAuth2Client.getAccessToken();
          console.log("Access token: %s", accessToken.toString());
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: "studybuddycs3219@gmail.com",
              clientId: CLIENT_ID,
              clientSecret: CLIENT_SECRET,
              refreshToken: REFRESH_TOKEN,
              accessToken: accessToken,
            },
          });

          const mailOptions = {
            to: req.body.email,
            subject: "Password reset",
            html: `
          <p>You requested a password reset for your StudyBuddy account!</p>
          <p>Click this <a href="http://localhost:3000/resetPassword/${token}">link</a> to set a new password.</p>
        `,
          };

          const sent_mail = transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return console.log(err);
            }

            console.log("Message sent: %s", info.message);
            console.log("Message URL: %s", nodemailer.getTestMessageUrl(info));
          });

          console.log(sent_mail);

          return res.status(200).json({
            result: sent_mail,
            token: token,
            message: "Reset password email sent!",
          });
        })
        .catch((err) => {
          if (err.message) {
            res.status(422).json({ message: err.message });
          } else {
            res
              .status(422)
              .json({ message: "There is an error with sending email!" });
          }
        });
    }
  });
};

exports.postVerifyEmail = (req, res, next) => {
  const uniqueString = req.body.uniqueString;
  User.findOne({
    uniqueString: uniqueString,
  })
    .then((user) => {
      user.isVerified = true;
      return user.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Your email is verified!" });
    })
    .then((result) => {
      res.status(200).json({ message: "Your email is verified!" });
    })
    .catch((err) => {
      res
        .status(422)
        .json({ message: "There is an error with verifying your account!" });
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const passwordToken = req.body.token;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      resetUser = user;
      return newPassword;
    })
    .then((pw) => {
      resetUser.password = pw;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then((result) => {
      res.status(200).json({ message: "Password reset successful!" });
    })
    .catch((err) => {
      res
        .status(422)
        .json({ message: "Your token is invalid or has expired." });
    });
};

exports.verifyToken = async (req, res) => {
  const token = req.headers["x-access-token"];
  const salt = req.headers["jwt-salt"];

  if (!token || !salt) {
    return res.status(401).json({ error: "You must be logged in." });
  }
  jwt.verify(token, process.env.TOKEN_KEY + salt, async (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ error: "You must be logged in." });
    } else {
      return res.status(200).json({ message: "Authenticated" });
    }
  });
};
