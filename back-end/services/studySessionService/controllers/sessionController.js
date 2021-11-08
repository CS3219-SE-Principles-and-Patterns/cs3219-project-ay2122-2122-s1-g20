const express = require("express");
const mongoose = require("mongoose");
const moment = require("moment");
const User = require("../model/user");
const Session = require("../model/session");

const today = moment().startOf("day");

// Get upcoming study session
exports.getUpcomingSessions = async (req, res, next) => {
  const username = req.params.username;
  const currentUser = await User.findOne({ username });
  if (!currentUser) {
    return res.status(200).json({ length: 0, sessions: [] });
  }
  const moduleList = currentUser.modules.map((mod) => mod.moduleCode);

  Session.find({ module: { $in: moduleList } })
    .find({ owner: { $ne: username } })
    .find({ participants: { $ne: username } })
    // Convert date of type string to Date, and then filter for those with date greater than current date
    .find({
      $expr: {
        $gte: [
          {
            $toDate: "$date",
          },
          "$$NOW",
        ],
      },
    })
    .then((sessions) => {
      res.status(200).json({ length: sessions.length, sessions });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in getting upcoming sessions." });
    });
};

// Get my created study session that has not expired yet
exports.getMySessions = (req, res, next) => {
  // remove uid from params after gateway api is implemented
  const username = req.params.username;
  Session.find({ owner: username })
    .sort("-date")
    .then((sessions) => {
      // session === array of session objects
      // const mySessions = session.filter((s) => {
      //   const dateArr = s.date.split("-");
      //   const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
      //   return date >= new Date();
      // });
      res.status(200).json({ length: sessions.length, sessions });
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "Error in getting my created sessions." });
    });
};

exports.getJoinedSessions = (req, res, next) => {
  // remove USERNAME from params after gateway api is implemented
  const username = req.params.username;
  Session.find({ participants: username })
    .find({ owner: { $ne: username } })
    .then((sessions) => {
      // session === array of session objects
      // const joinedSessions = session.filter((s) => {
      //   const dateArr = s.date.split("-");
      //   const date = new Date(dateArr[0], dateArr[1] - 1, dateArr[2]);
      //   return date < new Date();
      // });
      res.status(200).json({ length: sessions.length, sessions });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "Error in getting joined sessions." });
    });
};

exports.getASession = (req, res, next) => {
  // remove USERNAME from params after gateway api is implemented
  const sid = req.params.sid;
  Session.findById(sid)
    .then((session) => {
      console.log(session);
      res.status(200).json({ session });
    })
    .catch((err) => {
      res.status(404).json({ message: "Session does not exist." });
    });
};

// Create study session
exports.createSession = async (req, res, next) => {
  try {
    const current_date = new Date();
    if (
      Date.parse(req.body.date) <
      current_date.setDate(current_date.getDate() - 1)
    ) {
      return res.status(500).json({
        message: "Your indicated date is over, please choose another date!",
      });
    }
    const session = new Session(req.body);
    const createdSession = await session.save();
    return res.status(200).json({
      session: createdSession,
      message: "You have created a new study session!",
    });
  } catch (error) {
    console.log(error);
    let message = "Unable to create study session.";
    if (error.code === 11000) {
      message =
        "Title of study session already exists, please try again with a different title.";
    }
    return res.status(500).json({ message: message });
  }
};

// Delete study session
exports.deleteSession = (req, res, next) => {
  const sid = req.params.sid;
  Session.findById(sid)
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ message: "Could not find study session." });
      }
      return Session.findByIdAndRemove(sid);
    })
    .then((result) => {
      res.status(200).json({ message: "You have deleted this study session!" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ message: "Unable to delete this study session." });
    });
};

// Edit study session
exports.editStudySession = (req, res, next) => {
  const sid = req.params.sid;
  Session.findByIdAndUpdate(sid, req.body, { new: true }) // mongoose built in function
    .then((result) => {
      return res.status(200).json({
        message: "Your study session details are updated!",
        session: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      let message = "Unable to update details of your study session.";
      if (err.code === 11000) {
        message =
          "Title of study session already exists, please try again with a different title.";
      }
      return res.status(err.statusCode).json({ message: message });
    });
};

// Get interested study session details

// Join study session, update time range upon successful join
