const ws = require('ws');
async function setupSocketServer(expressServer) {
  const wss = new ws.WebSocketServer({ server: expressServer });
  wss.on('connection', (connection) => {
    console.log('connected');
  });
}
module.exports = setupSocketServer;
