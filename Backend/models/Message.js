const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    from: String,
    urlOnAzure: String,
    file: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const MessageModel = new mongoose.model('Message', MessageSchema);
module.exports = MessageModel;
