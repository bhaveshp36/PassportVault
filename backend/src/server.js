const http = require("http"); // http module in node.js
const app = require("./app"); //importing app.js file
const connectMongo = require("./common/mongoConnector"); //importing mongoConnector.js file
const server = http.createServer(app); //creating server of app using http module

const port = process.env.PORT || 8000; //port number

connectMongo().then(() => {
  //function for server listening on port
  server.listen(port, () => {
    console.log(`server is running on port  ${port}`);
    console.log(`http://localhost:${port}`);
  });
  server.on("error", (err) => {
    console.error("Server Error: ", err);
  });
});
