const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JwtSecret;

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const UserDoc = await UserModel.create({
      username,
      password,
    });
    console.log(jwtSecret);
    let token = await jwt.sign({ id: UserDoc._id }, jwtSecret);

    res.cookie('token', token).status(201).json('ok');
  } catch (e) {
    res.status(400).json(e);
  }
});
router.get('/registerrrr', (req, res) => {
  res.send('hi');
});

module.exports = router;
