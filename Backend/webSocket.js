const ws = require('ws');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JwtSecret;
const MessageModel = require('./models/Message');
const fs = require('fs');
const saveToBlob = require('./Services/AzureBlobService');

function getIdUsernameFromClient(client) {
  return { userId: client.userId, username: client.username };
}
function sendAliveUsers(listOfClients) {
  let listOfUsers = [];
  for (let client of listOfClients) {
    if (client.isAlive) {
      listOfUsers.push(getIdUsernameFromClient(client));
    }
  }
  const users = {};
  listOfUsers.forEach((user) => (users[user.userId] = user.username));

  listOfClients.forEach((client) => {
    client.send(JSON.stringify({ online: users }));
  });
}

async function setupSocketServer(expressServer) {
  const wss = new ws.WebSocketServer({ server: expressServer });

  wss.on('connection', async (connection, req) => {
    try {
      const cookies = req.headers.cookie;
      //if we have multiple cookies they will be semicolon separated
      let cookie = null;
      let token = null;
      if (cookies) {
        cookie = cookies.split(';').find((s) => s.startsWith('token='));
        if (cookie) {
          token = cookie.split('=')[1];
        } else {
          connection.terminate();
          return;
        }
        if (token) {
          let decodedJson = await jwt.verify(token, jwtSecret);
          let { id, username } = decodedJson;
          //verified
          connection.userId = id;
          connection.username = username;
          connection.isAlive = true;

          connection.pinger = setInterval(() => {
            connection.ping();
            console.log('initiating death.');
            connection.killer = setTimeout(() => {
              connection.isAlive = false;
              connection.terminate();
              clearInterval(connection.pinger);
              let listOfClients = [...wss.clients];
              console.log('client killed. ');
              sendAliveUsers(listOfClients);
            }, 2000);
          }, 15000);

          connection.on('pong', () => {
            console.log('you are lucky to live longer.');
            clearTimeout(connection.killer);
          });

          connection.on('close', () => {
            // delete connection['userId'];
            // delete connection['username'];
            clearInterval(connection.pinger);
            connection.isAlive = false;

            let listOfClients = [...wss.clients];
            listOfClients = listOfClients.filter(
              (x) => x.username != connection.username
            );
            sendAliveUsers(listOfClients);
            connection.terminate();
          });

          connection.on('message', async (message) => {
            message = JSON.parse(message.toString());
            const { recipient, text, file, name, type } = message;
            if (recipient && text) {
              const messageDoc = await MessageModel.create({
                sender: connection.userId,
                from: connection.username,
                recipient: recipient,
                text: text,
              });
              for (let client of wss.clients) {
                if (
                  client.userId === recipient ||
                  client.userId === connection.userId
                ) {
                  client.send(
                    JSON.stringify({
                      text,
                      sender: connection.userId,
                      recipient: recipient,
                      messageId: messageDoc._id,
                      from: messageDoc.from,
                    })
                  );
                }
              }
            } else if (recipient && file) {
              let parts = name.split('.');
              let extension = parts[parts.length - 1];
              const filename = Date.now() + '.' + extension;
              const path = __dirname + '\\uploads\\' + filename;
              const buffer = Buffer.from(file, 'base64');
              const { imageUrl } = await saveToBlob(name, extension, buffer);

              fs.writeFile(path, buffer, 'base64', () => {
                console.log('file saved at: ' + path);
              });
              const messageDoc = await MessageModel.create({
                sender: connection.userId,
                from: connection.username,
                recipient: recipient,
                file: path,
                urlOnAzure: imageUrl,
              });
              for (let client of wss.clients) {
                if (
                  client.userId === recipient ||
                  client.userId === connection.userId
                ) {
                  client.send(
                    JSON.stringify({
                      file: filename,
                      urlOnAzure: messageDoc.urlOnAzure,
                      sender: connection.userId,
                      recipient: recipient,
                      messageId: messageDoc._id,
                      from: messageDoc.from,
                    })
                  );
                }
              }
            }
          });
        } else {
          connection.terminate();
          return;
        }
      } else {
        connection.terminate();
        return;
      }
      //Notifying everyone about who is online
      let listOfClients = [...wss.clients];
      sendAliveUsers(listOfClients);
    } catch (e) {
      console.log('error: ' + e);
      connection.terminate();
    }
  });
}
module.exports = setupSocketServer;
