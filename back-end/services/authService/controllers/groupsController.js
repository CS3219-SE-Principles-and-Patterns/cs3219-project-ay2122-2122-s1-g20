const express = require("express");
const mongoose = require("mongoose");

const User = require("../model/user");

exports.getGroups = async (req, res) => {
  //params includes email
  try {
    const user = await User.findOne({ email: req.params.email }).exec();
    const data = user.groups;
    res
      .status(200)
      .send({ groups: data, message: "Groups successfully loaded!" });
    return;
  } catch (err) {
    res.status(404).send({ message: "Error with getting groups." });
    return;
  }
};

exports.addGroup = async (req, res) => {
  //req includes email and groupId
  console.log(req.body.groupId);
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    //console.log(user);
    const currentGroups = user.groups;
    const newGroups = currentGroups.concat(req.body.groupId);
    const updatedUser = await User.findOneAndUpdate(
      { email: req.body.email },
      { groups: newGroups },
      { new: true }
    );
    res.status(200).send({ user: updatedUser, message: "User updated" });
    return;
  } catch (err) {
    console.log(err);
    res.status(404).send({ message: "Error with adding groups." }); //change status code
    return;
  }
};

exports.removeGroup = async (req, res) => {
  //req includes email and groupId
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    user.groups.pull(req.body.groupId);
    await user.save();
    res.status(200).send({ user: user, message: "User updated" });
    console.log("updated removal");
    return;
  } catch (err) {
    res.status(404).send({ message: "Error with removing groups." });
    console.log(err);
    return;
  }
};
