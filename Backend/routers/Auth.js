const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendMail = require('../Services/EmailService');
const UserModel = require('../models/User');
// const setupSocketServer = require('../webSocket');
const jwtSecret = process.env.JwtSecret;
const bcryptsalt = bcrypt.genSaltSync(10);
// const { server } = require('../index');

const router = express.Router();

router.post('/verify', async (req, res) => {
  try {
    const { username, token } = req.body;
    const UserDoc = await UserModel.findOne({
      username,
    });
    const compare = req.body.token === UserDoc.emailConfirmationToken;
    console.log(req.body.token);
    console.log(UserDoc.emailConfirmationToken);
    console.log(compare);
    if (compare) {
      await UserModel.updateOne(
        { username: req.body.username },
        { emailConfirmedFlag: true }
      );
      res.status(201).json({ msg: 'Verified' });
    } else {
      res.status(500).json({ msg: 'Invalid token' });
    }
  } catch (e) {
    res.status(500).json({ msg: 'user not found' });
  }
});
router.get('/logout', async (req, res) => {
  res
    .cookie('token', '', { sameSite: 'none', secure: true })
    .status(201)
    .send('logged out');
});

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
    const defaultTo = username;
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
    } else if (!hashed === UserDoc.password) {
      res.status(401).json({ msg: 'Incorrect credentials' });
    } else {
      let token = await jwt.sign({ id: UserDoc._id, username }, jwtSecret);
      // await setupSocketServer(server);
      res
        .cookie('token', token, { sameSite: 'none', secure: true })
        .status(201)
        .json({ id: UserDoc._id, username });
    }
  } catch (e) {
    res.status(404).json(e);
  }
});

router.get('/profile', async (req, res) => {
  try {
    let token = req.cookies?.token;
    console.log(token);
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

router.post('/logout', async (req, res) => {
  res
    .cookie('token', '', { sameSite: 'none', secure: true })
    .status(200)
    .send('Logged out');
});

module.exports = router;
