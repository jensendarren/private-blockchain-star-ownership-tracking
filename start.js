const app = require('./app');

app.listen(app.get("port"), () => {
  console.log(`Server Listening for port: ${app.get("port")}`);
});