const server = require('./app');

server.app.listen(server.app.get("port"), () => {
  console.log(`Server Listening for port: ${server.app.get("port")}`);
});