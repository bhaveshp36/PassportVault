const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.login = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select("+pwdHash"); // Include pwdHash for comparison
    console.log("User login Found:", user);
    if (!user || !(await bcrypt.compare(password, user.pwdHash))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Error during authentication:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred during authentication",
    });
  }
};
