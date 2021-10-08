const express = require("express");
const mongoose = require("mongoose");

const Room = require("../model/room");

exports.create = async (req,res) => {
    try {
        const name = req.body.name
        const checkRoom = await Room.findOne({ name });
        if (checkRoom) {
            res.status(400).send({message: "This name has been used. Please set a different name"});
            return;
        }

        const room = new Room();
        room.name = req.body.name;
        room.hashtag = req.body.hashtag;
        room.uid = req.body.uid;
        room.lastModified = req.body.lastModified;
        await room.save();
        res.status(200).send({message: "Room successfully created!"});
        return;
        
    } catch (err) {
        res.status(422).send({message: "Error with creating room."});
        console.log(err);
        return;
    }
}

exports.get = async (req, res) => {
    try {
        const data = await Room.find();
        if (data) {
            res.status(200).send({rooms: data, message: "Rooms successfully loaded!"});
            return;
        } 
    } catch (err) {
        console.log(err);
        res.status(422).send({message: "Error with getting rooms."});
        return;
    }
}
