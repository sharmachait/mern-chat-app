const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: String,
    emailConfirmationToken: {
      type: String,
      required: true,
      unique: true,
    },
    emailConfirmedFlag: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model('User', UserSchema);
module.exports = UserModel;
