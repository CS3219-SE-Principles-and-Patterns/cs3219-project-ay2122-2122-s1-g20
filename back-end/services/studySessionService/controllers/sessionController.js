const express = require("express");
const mongoose = require("mongoose");

const Session = require("../model/session");

// Get upcoming study session
// exports.getUpcomingSession = (req, res, next) => {
//   Session.findById(sid)
//     .then((post) => {
//       if (!post) {
//         const error = new Error("Could not find study session.");
//         error.status = 404;
//         throw error;
//       }
//       return Session.findByIdAndRemove(sid);
//     })
//     .then((result) => {
//       res
//         .status(200)
//         .json({ message: "Study session is successfully deleted!" });
//     })
//     .catch((err) => {
//       if (!err.statusCode) {
//         err.statusCode = 500;
//       }
//       res.status(500).json({ message: "Error with deleting study session." });
//     });
// };

// Create study session
exports.createSession = async (req, res, next) => {
  try {
    // sample data
    //   {
    //     "title": "testing",
    //     "capacity": 5,
    //     "owner": "sylviaokt",
    //     "timeLimit": "1",
    //     "time": {
    //         "start": "14:00",
    //         "end": "16:00"
    //     },
    //     "module": "CS3219",
    //     "date": "tuesday",
    //     "participants": ["sylviaokt","andreatan", "mabelkang", "limhaishan"],
    //     "isOnline": "online"
    // }
    const session = new Session(req.body);
    const createdSession = await session.save();
    return res.status(200).json({
      studySessionId: createdSession._id,
      message: "Study session successfully created!",
    });
  } catch (error) {
    console.log(error);
    var message = "Error with creating study session.";
    if (error.code === 11000) {
      message =
        "Title of study session already exists, please try again with a different title.";
    }
    return res.status(500).json({ message });
  }
};

// Delete study session
exports.deleteSession = (req, res, next) => {
  const sid = req.params.sid;
  Session.findById(sid)
    .then((post) => {
      if (!post) {
        const error = new Error("Could not find study session.");
        error.status = 404;
        throw error;
      }
      return Session.findByIdAndRemove(sid);
    })
    .then((result) => {
      res.status(200).json({
        message: "Study session is successfully deleted!",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ message: "Error with deleting study session." });
    });
};

// Edit study session
exports.editStudySession = (req, res, next) => {
  const sid = req.params.sid;
  const title = req.body.title;
  const capacity = req.body.capacity;
  const time = req.body.time;
  const timeLimit = req.body.timeLimit;
  const module = req.body.module;
  const date = req.body.date;
  const isOnline = req.body.isOnline;
  const participants = req.body.participants;

  Session.findById(sid) // mongoose built in function
    .then((session) => {
      if (!session) {
        const error = new Error("Could not find study session.");
        error.status = 404;
        throw error;
      }
      session.title = title;
      session.capacity = capacity;
      session.time = time;
      session.timeLimit = timeLimit;
      session.participants = participants;
      session.end = end;
      session.module = module;
      session.date = date;
      session.isOnline = isOnline;
      return session.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "Study session details updated!",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      console.log(err);
      res.status(500).json({ message: "Error with editing study session." });
    });
};

// Get interested study session details

// Join study session, update time range upon successful join
