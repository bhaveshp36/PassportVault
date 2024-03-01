//mongoConnector.js is a common file to connect to MongoDB using mongoose library
const mongoose = require("mongoose");
require("dotenv").config();

const connectMongo = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      "Database connected succesfully : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectMongo;
