const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const sendMail = require('../Services/EmailService');
const MessageModel = require('../models/Message');
const UserModel = require('../models/User');
const { mapMessage } = require('../Utils/AutoMapperConfig');
// const setupSocketServer = require('../webSocket');
const jwtSecret = process.env.JwtSecret;
const bcryptsalt = bcrypt.genSaltSync(10);
// const { server } = require('../index');

const router = express.Router();

router.get('/get/:selectedUserId', async (req, res) => {
  try {
    const selectedUserId = req.params.selectedUserId;
    let token = req.cookies?.token;

    if (token) {
      let decodedJson = await jwt.verify(token, jwtSecret);
      let { id, username } = decodedJson;

      const UserDoc = await UserModel.findById(id);

      if (!UserDoc.emailConfirmedFlag) {
        return res.status(401).json({ msg: 'Account not verified' });
      }
      const currUserId = UserDoc._id;

      let messages = await MessageModel.find({
        sender: { $in: [currUserId, selectedUserId] },
        recipient: { $in: [currUserId, selectedUserId] },
      }).sort({ createdAt: 1 });

      for (let i = 0; i < messages.length; i++) {
        messages[i] = mapMessage(messages[i]);
      }

      console.log({ messages });
      return res.status(200).json({ messages });
    } else {
      return res.status(403).json({ msg: 'unauthorized' });
    }
  } catch (e) {
    console.log(e);
    res.status(401).json({ msg: 'unauthorized' });
  }
});

module.exports = router;
