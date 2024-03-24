// authorization.js is similar to authentication.js,
// but instead of verifying the user's identity,
// it verifies the user's access level.
// This middleware is used to restrict access to certain routes based on the user's access level.
// If the user does not have the required access level, a 403 Forbidden response is sent back to the client.

module.exports = (requiredAccessLevels) => {
  return (req, res, next) => {
    if (!req.user || !requiredAccessLevels.includes(req.user.accessLevel)) {
      return res.status(403).json({
        success: false,
        message:
          "You do not have the necessary permissions to access this resource",
      });
    }
    console.log("User authorized:", req.user);
    next();
  };
};
