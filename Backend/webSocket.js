const ws = require('ws');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JwtSecret;

function getIdUsernameFromClient(client) {
  return { userId: client.userId, username: client.username };
}
function sendAliveUsers(listOfClients) {
  let listOfUsers = listOfClients.map(getIdUsernameFromClient);
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
          await connection.terminate();
          return;
        }
        if (token) {
          let decodedJson = await jwt.verify(token, jwtSecret);
          let { id, username } = decodedJson;
          //verified
          connection.userId = id;
          connection.username = username;
          connection.on('close', () => {
            delete connection['userId'];
            delete connection['username'];
            let listOfClients = [...wss.clients];
            sendAliveUsers(listOfClients);
          });
          //all the connections are stored in the WebSocketServer.clients object

          connection.on('message', (message) => {
            console.log(message.toString());
            message = JSON.parse(message.toString());
            const { recipient, text } = message;

            for (let client of wss.clients) {
              if (client.userId === recipient) {
                client.send(JSON.stringify({ text }));
              }
            }
          });
        } else {
          await connection.terminate();
          return;
        }
      } else {
        await connection.terminate();
        return;
      }
      //Notifying everyone about who is online
      let listOfClients = [...wss.clients];
      sendAliveUsers(listOfClients);
    } catch (e) {
      console.log('error: ' + e);
      await connection.terminate();
    }
  });
}
module.exports = setupSocketServer;
