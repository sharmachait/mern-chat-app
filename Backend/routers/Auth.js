const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendMail = require('../Services/EmailService');
const UserModel = require('../models/User');
const jwtSecret = process.env.JwtSecret;
const bcryptsalt = bcrypt.genSaltSync(10);

const router = express.Router();

router.get('/verify/:emailConfirmationToken', async (req, res) => {});

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, bcryptsalt);
    const emailConfirmationToken = bcrypt.hashSync(username, bcryptsalt);

    const UserDoc = await UserModel.create({
      username: username,
      password: hashed,
      emailConfirmationToken: emailConfirmationToken,
      emailConfirmedFlag: false,
    });

    const defaultFrom = {
      name: 'yapper',
      address: process.env.senderemail,
    };
    const defaultTo = 'chait8126@gmail.com';
    const subject = 'Yapper account verfication';
    const token = emailConfirmationToken;
    const response = await sendMail(defaultFrom, defaultTo, subject, token);
    if (response !== 'Email Sent Successfully')
      throw new Error('email not sent');
    res.status(201).json({ response: response });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashed = bcrypt.hashSync(password, bcryptsalt);

    const UserDoc = await UserModel.findOne({
      username,
    });

    if (!UserDoc.emailConfirmedFlag) {
      res.status(401).json({ msg: 'Account not verified' });
    }

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

      if (!UserDoc.emailConfirmedFlag) {
        res.status(401).json({ msg: 'Account not verified' });
      }

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
