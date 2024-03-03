//mongoConnector.js is a common file to connect to MongoDB using mongoose library
const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      "Database connected succesfully : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(`Database Connection Failed: ${error}`);
    process.exit(1);
  }
};

module.exports = connectMongo;
