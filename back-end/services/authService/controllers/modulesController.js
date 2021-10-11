const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const User = require("../model/user");

exports.addModules = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

exports.deleteModules = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};
