const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./common/swaggerDoc");
//const csurf = require("csurf");

const app = express();

app.use(cors());
// Enable CSRF protection
//const csrfProtection = csurf({ cookie: true });
//app.use(csrfProtection);

//For body Parsing//
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes //

// admin routes
const adminRoutes = require("./routes/admin.route");
app.use("/login", adminRoutes);

// Routes for the models
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
app.use("/expiring-passports", expiringPassportsRoute);

const passportsByParentRoute = require("./analytics/getPassportsByParent");
app.use("/passports-by-parent", passportsByParentRoute);

const visaByPassportRoute = require("./analytics/getVisaByParent");
app.use("/visa-by-passport", visaByPassportRoute);

const fileRouter = require("./routes/files.route");
app.use("/files", fileRouter);

const searchRouter = require("./analytics/searchMember");
app.use("/search", searchRouter);

// Default Route //
app.get("/", (req, res) => {
  res.send(
    "Server is running on port 8000. Please visit /docs for API documentation."
  );
});

module.exports = app;
