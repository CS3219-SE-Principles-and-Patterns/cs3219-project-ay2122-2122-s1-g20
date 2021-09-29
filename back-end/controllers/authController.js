const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

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
    res.json({token: token, message: "User successfully logged in!" });
  } catch (err) {
    return res.status(422).json({ message: "Invalid password or email entered." });
  }
};
