const express = require("express");
//const cors = require("cors");
//const errorHandler = require("./middleware/errorhandler");
const connectMongo = require("./common/mongoConnector");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require("./common/swaggerDoc");


connectMongo(); //call of database function

const app = express();

//For body Parsing//
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Routes //
const memberRoutes = require("./routes/member.route");
app.use("/members", memberRoutes);

const passportRoutes = require("./routes/passport.route");
app.use("/passports", passportRoutes);

const visaRoutes = require("./routes/visa.route");
app.use("/visas", visaRoutes);

module.exports = app;
