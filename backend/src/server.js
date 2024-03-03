const http = require("http");  // http module in node.js
const app = require("./app");  //importing app.js file
const server = http.createServer(app); //creating server

const port = process.env.PORT || 8000; //port number
console.log(port);

//function for server listening on port
server.listen(port, () => {
  console.log(`server is running on port  ${port}`);
});
