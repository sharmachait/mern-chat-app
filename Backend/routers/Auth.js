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
    let token = await jwt.sign({ id: UserDoc._id, username }, jwtSecret);

    res
      .cookie('token', token, { sameSite: 'none', secure: true })
      .status(201)
      .json({ id: UserDoc._id });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/profile', async (req, res) => {
  try {
    let token = req.cookies?.token;
    if (token) {
      let decodedJson = await jwt.verify(token, jwtSecret);
      let { id, username } = decodedJson;
      const UserDoc = await UserModel.findById(id);
      res.status(200).json({ id: UserDoc._id, username: UserDoc.username });
    } else {
      res.status(401).json({ msg: 'unauthorized' });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: 'unauthorized' });
  }
});

module.exports = router;
