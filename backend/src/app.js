const express = require("express");
//const cors = require("cors");
//const errorHandler = require("./middleware/errorhandler");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./common/swaggerDoc");

const app = express();

//app.use(errorHandler);
//app.use(cors());

//For body Parsing//
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.send(
    "Server is running on port 8000. Please visit /docs for API documentation."
  );
});

// Routes //
const memberRoutes = require("./routes/member.route");
app.use("/members", memberRoutes);

const passportRoutes = require("./routes/passport.route");
app.use("/passports", passportRoutes);

const visaRoutes = require("./routes/visa.route");
app.use("/visas", visaRoutes);

module.exports = app;
