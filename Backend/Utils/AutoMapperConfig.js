function mapMessage(from) {
  console.log(from);
  let to = {
    sender: from['sender'],
    recipient: from['recipient'],
    text: from['text'],
    from: from['from'],
    messageId: from['_id'],
  };
  return to;
}

module.exports = { mapMessage };
