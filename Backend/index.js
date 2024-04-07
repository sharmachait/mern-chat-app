const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/Auth');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const setupSocketServer = require('./webSocket');

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
    app.use('/auth', authRouter);

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
