const express = require("express");
const mongoose = require("mongoose");

const Message = require("../model/message");

exports.add = async (req, res) => {
  try {
    const message = new Message();
    message.group_id = req.body.group_id;
    message.sender = req.body.sender;
    message.timestamp = req.body.timestamp;
    message.content = req.body.content;
    message.profilePic = req.body.profilePic;
    await message.save();
    res.status(200).send({ message: "Message successfully sent!" });
    return;
  } catch (err) {
    res.status(422).send({ message: "Error with sending message." });
    console.log(err);
    return;
  }
};

exports.retrieve = async (req, res) => {
  try {
    const id = req.params.group_id;
    const data = await Message.find({ group_id: id })
      .select("-_id -__v")
      .exec();
    if (data) {
      res
        .status(200)
        .send({ messages: data, message: "Messages successfully loaded!" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "Error with getting messages." });
    return;
  }
};
