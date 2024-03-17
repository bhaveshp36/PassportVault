const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./common/swaggerDoc");

const app = express();

app.use(cors());

//For body Parsing//
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes //
const memberRoutes = require("./routes/member.route");
app.use("/members", memberRoutes);

const organizationRoutes = require("./routes/organization.route");
app.use("/organizations", organizationRoutes);

const passportRoutes = require("./routes/passport.route");
app.use("/passports", passportRoutes);

const travelDetailRoutes = require("./routes/travelDetail.route");
app.use("/travel-details", travelDetailRoutes);

const travelPlanRoutes = require("./routes/travelPlan.route");
app.use("/travel-plans", travelPlanRoutes);

const userRoutes = require("./routes/user.route");
app.use("/users", userRoutes);

const visaRoutes = require("./routes/visa.route");
app.use("/visas", visaRoutes);

const visaApplicationRoutes = require("./routes/visaApplication.route");
app.use("/visa-applications", visaApplicationRoutes);

// Analytics Route //
const expiringPassportsRoute = require("./analytics/expiringPassports");
app.use("/expiringPassports", expiringPassportsRoute);

// Default Route //
app.get("/", (req, res) => {
  res.send(
    "Server is running on port 8000. Please visit /docs for API documentation."
  );
});

module.exports = app;
