const express = require("express");
const Pusher = require("pusher");
const mongoose = require("mongoose");
const Crvotes = require("../public/models/Crvotes");
const { response } = require("express");

const router = express.Router();

const pusher = new Pusher({
  appId: "1239150",
  key: "ec27827143298aa52073",
  secret: "9b19a232f5aa9c7dfd79",
  cluster: "ap2",
  useTLS: true,
});

router.get("/", (req, res) => {
  Crvotes.find().then((votes) => {
    res.json({ sucess: true, votes: votes });
  });
});

router.post("/", (req, res) => {
  const newVote = {
    party: req.body.party,
    points: 1,
  };

  new Crvotes(newVote).save().then((vote) => {
    pusher.trigger("cr-poll", "cr-vote", {
      points: parseInt(vote.points),
      party: vote.party,
    });
  });

  return res.json({
    sucess: true,
    message: "Thanks Buddy for Your Precious Vote",
  });
});

//here / represents the crpolling that we used in app.js

module.exports = router;
