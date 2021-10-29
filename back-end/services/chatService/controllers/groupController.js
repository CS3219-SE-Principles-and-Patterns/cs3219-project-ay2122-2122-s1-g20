const express = require("express");
const mongoose = require("mongoose");

const Group = require("../model/group");

exports.create = async (req, res) => {
  console.log(req);
  try {
    const name = req.body.name;
    const checkGroup = await Group.findOne({ name });
    if (checkGroup) {
      res.status(400).send({
        message: "This name has been used. Please set a different name",
      });
      return;
    }

    const group = new Group();
    group.name = req.body.name;
    group.hashtag = req.body.hashtag;
    group.uid = req.body.uid;
    group.lastModified = req.body.lastModified;
    group.creator = req.body.creator;
    group.state = req.body.state;
    await group.save();
    res.status(200).send({ group: group, message: "Group successfully created!" });
    return;
  } catch (err) {
    res.status(422).send({ message: "Error with creating group." });
    console.log(err);
    return;
  }
};

exports.delete = async (req, res) => {
  try {
    const id = req.params.group_id;
    const data = await Group.remove({ _id: id });
    if (data) {
      res
        .status(200)
        .send({ info: data, message: "Group successfully deleted!" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "Error with deleting group." });
    return;
  }
};

exports.getGroupsCreated  = async (req, res) => {
  try {
    const creator = req.params.creator;
    const data = await Group.find({ creator: creator });
    if (data) {
      res
        .status(200)
        .send({ groups: data, message: "Groups successfully loaded!" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "Error with getting group." });
    return;
  }
};

exports.get = async (req, res) => {
  try {
    const data = await Group.find();
    if (data) {
      res
        .status(200)
        .send({ groups: data, message: "Groups successfully loaded!" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "Error with getting groups." });
    return;
  }
};

exports.retrieveGroup = async (req, res) => {
  try {
    const id = req.params.group_id;
    const data = await Group.find({ _id: id });
    if (data) {
      res
        .status(200)
        .send({ info: data, message: "Groups successfully loaded!" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(422).send({ message: "Error with getting group." });
    return;
  }
};

exports.addUser = async (req, res) => {
  //req includes email and groupId
  try {
    console.log("ADD");
    const group = await Group.findById(req.body.groupId).exec();
    console.log(group);
    group.uid.push(req.body.email);
    await group.save();
    res.status(200).send({ group: group, message: "Group members updated" });
    return;
  } catch (err) {
    res.status(404).send({ message: "Error with adding group members." });
    return;
  }
};

exports.removeUser = async (req, res) => {
  //req includes email and groupId
  try {
    const group = await Group.findById(req.body.groupId).exec();
    group.uid.pull(req.body.email);
    await group.save();
    res.status(200).send({ group: group, message: "Group members updated" });
    return;
  } catch (err) {
    res.status(404).send({ message: "Error with removing group members." });
    return;
  }
};

exports.updateState = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.body.groupId, 
      { state: "disabled", timeOfDisable: Date.now() },
      { new: true }
    );
    res.status(200).send({ group: group, message: "Group disabled" });
    return;
  } catch (err) {
    res.status(404).send({ message: "Error with disabling group" });
    return;
  }
};

exports.checkAndDeleteGroups =  () => {
  const check = Date.now() - 172800000;
  Group.deleteMany({state: "disabled", timeOfDisable: {$lte: check}}).then(function(){
    console.log("deleted");
  }).catch(function(err){
    console.log(err);
  });
}