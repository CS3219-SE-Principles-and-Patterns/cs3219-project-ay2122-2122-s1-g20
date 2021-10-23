const mongoose = require("mongoose");
const User = require("../model/user");

exports.addModules = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { modules: req.body.modules },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};

exports.deleteModules = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { modules: [] },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};
