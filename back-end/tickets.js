const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

const ticketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  mealName: String,
  mealTime: String,
  nutrition: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const User = users.model;
const validUser = users.valid;
const Ticket = mongoose.model('Ticket', ticketSchema);


router.get('/', validUser, async (req, res) => {
  try {
    let tickets = await Ticket.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send({
      tickets: tickets
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post('/', validUser, async (req, res) => {
  const ticket = new Ticket({
    user: req.user,
    mealName: req.body.mealName,
    mealTime: req.body.mealTime,
    nutrition: req.body.nutrition,
  });
  try {
    await ticket.save();
    return res.send({
      ticket: ticket
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({
      _id: req.params.id
    })
    ticket.mealName = req.body.mealName;
    ticket.mealTime = req.body.mealTime;
    ticket.nutrition = req.body.nutrition;
    await ticket.save();
    return res.send({
      ticket: ticket
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router
}
