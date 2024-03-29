const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routers/Auth');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

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

    app.listen(
      process.env.PORT,
      console.log(`listening on ${process.env.PORT}`)
    );
  } catch (e) {
    console.log('error ' + e);
  }
}

StartUp();
