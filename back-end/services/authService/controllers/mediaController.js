const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

const User = require("../model/user");

exports.uploadMedia = async (req, res, next) => {
  try {
    if (req.body.profilePic) {
      await cloudinary.v2.uploader
        .upload(
          req.body.profilePic,
          // { folder: `/${req.body.id}/`, public_id: "profile_image" },
          (error, result) => {
            if (result) {
              req.body.profilePic = result.secure_url;
            }
          }
        )
        .catch(
          (err) =>
            (req.body.profilePic =
              // dummy profile pic if the one provided is invalid
              "http://dreamvilla.life/wp-content/uploads/2017/07/dummy-profile-pic.png")
        );
      if (!req.body.modules) {
        const updatedUser = await User.findOneAndUpdate(
          { email: req.body.email },
          { profilePic: req.body.profilePic },
          { new: true }
        );
        res.status(200).json({
          status: "success",
          updatedUser,
        });
      } else {
        // for first login route: add profile pic and modules
        // next() --> add modules
        next();
      }
    }
  } catch (err) {
    res.status(404).json({
      err: err.message,
    });
  }
};

exports.deleteMedia = async (req, res, next) => {
  try {
    await cloudinary.v2.uploader.destroy(
      // send image path from the front end side
      req.body.imagePath,
      async (error, result) => {
        if (result.result === "ok") {
          // console.log(result);
          const updatedUser = await User.findOneAndUpdate(
            { email: req.body.email },
            { profilePic: "" },
            { new: true }
          );
          res.status(200).json({
            status: "success",
            updatedUser,
          });
        } else if (error) {
          res.status(error.http_code).json({
            error,
          });
        } else {
          res.status(404).json({
            status: result.result,
          });
        }
      }
    );
  } catch (err) {
    res.status(404).json({
      status: err.message,
    });
  }
};
