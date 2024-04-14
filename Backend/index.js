const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/Auth');
const messageRouter = require('./routers/Message');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const setupSocketServer = require('./webSocket');
const jwt = require('jsonwebtoken');
const MessageModel = require('./models/Message');
const { mapMessage } = require('./Utils/AutoMapperConfig');
const bcrypt = require('bcryptjs');

const jwtSecret = process.env.JwtSecret;
const bcryptsalt = bcrypt.genSaltSync(10);
async function StartUp() {
  try {
    await mongoose.connect(process.env.MongoUrl);
    const app = express();

    app.use(
      cors({
        credentials: true,
        origin: process.env.ClientUrl,
      })
    );

    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use('/uploads', express.static(__dirname + '\\uploads'));
    app.use('/auth', authRouter);
    app.use('/messages', messageRouter);

    app.get('/people', async (req, res) => {
      try {
        const selectedUserId = req.params.selectedUserId;
        let token = req.cookies?.token;

        if (token) {
          let decodedJson = await jwt.verify(token, jwtSecret);
          let { id, username } = decodedJson;

          const UserDoc = await UserModel.findById(id);

          if (!UserDoc.emailConfirmedFlag) {
            res.status(401).json({ msg: 'Account not verified' });
          }
          let people = await UserModel.find({ emailConfirmedFlag: true });
          people = people.map((x) => {
            return { userId: x._id, username: x.username };
          });
          res.status(200).json({ people });
        } else {
          res.status(403).json({ msg: 'unauthorized' });
        }
      } catch (e) {
        console.log(e);
        res.status(401).json({ msg: 'unauthorized' });
      }
    });

    const server = app.listen(
      process.env.PORT,
      console.log(`listening on ${process.env.PORT}`)
    );
    // module.exports = { server };
    await setupSocketServer(server);
  } catch (e) {
    console.log('error ' + e);
  }
}

StartUp();
