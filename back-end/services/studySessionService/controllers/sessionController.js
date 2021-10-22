const express = require("express");
const mongoose = require("mongoose");

const Session = require("../model/session");

// Create study session
exports.createSession = async (req, res, next) => {
  try {
    const session = new Session({
      title: req.body.title,
      capacity: req.body.capacity,
      timeLimit: req.body.timeLimit,
      start: req.body.start,
      end: req.body.end,
      module: req.body.module,
      date: req.body.date,
      isOnline: req.body.isOnline,
    });

    await session.save();
    return res
      .status(200)
      .json({ message: "Study session successfully created!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error with creating study session." });
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
      res
        .status(200)
        .json({ message: "Study session is successfully deleted!" });
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
  const start = req.body.start;
  const end = req.body.end;
  const module = req.body.module;
  const date = req.body.date;
  const isOnline = req.body.isOnline;

  Session.findById(sid) // mongoose built in function
    .then((session) => {
      if (!session) {
        const error = new Error("Could not find study session.");
        error.status = 404;
        throw error;
      }
      session.title = title;
      session.capacity = capacity;
      session.start = start;
      session.end = end;
      session.module = module;
      session.date = date;
      session.isOnline = isOnline;
      return session.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Study session details updated!", post: result });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      res.status(500).json({ message: "Error with editing study session." });
    });
};

// Get interested study session details

// Join study session, update time range upon successful join
