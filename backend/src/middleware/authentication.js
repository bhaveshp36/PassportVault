// Desc: Middleware to authenticate the user by verifying the JWT token
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by the userId in the decoded token
    const user = await User.findById(decoded.userId);

    // If user not found, return error
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }

    // Assign the user to the request object
    req.user = user;
    console.log("User authenticated:", user);
    // Continue to the next middleware
    next();
  } catch (error) {
    // Handle any errors that occur during the authentication process
    console.error("Error during authentication:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication",
    });
  }
};
