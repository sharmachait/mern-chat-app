const ws = require('ws');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JwtSecret;

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
        }
        if (token) {
          let decodedJson = await jwt.verify(token, jwtSecret);
          let { id, username } = decodedJson;
          //verified
          connection.userId = id;
          connection.username = username;
        }
      }
      //seeing who all are online
      console.log([...wss.clients].map((c) => c.username));
    } catch (e) {
      console.log('error: ' + e);
    }
  });
}
module.exports = setupSocketServer;
