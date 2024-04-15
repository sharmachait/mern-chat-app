function mapMessage(from) {
  if (from.file) {
    let parts = from?.file.split('\\');
    let name = parts?.[parts.length - 1];
    let to = {
      sender: from['sender'],
      recipient: from['recipient'],
      text: from?.text,
      from: from['from'],
      messageId: from['_id'],
      file: name,
      urlOnAzure: from.urlOnAzure,
    };
    return to;
  }
  let to = {
    sender: from['sender'],
    recipient: from['recipient'],
    text: from?.text,
    from: from['from'],
    messageId: from['_id'],
  };
  return to;
}

module.exports = { mapMessage };
