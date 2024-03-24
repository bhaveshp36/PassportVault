const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.pwdHash, 10); // Hashing the password
    req.body.pwdHash = hashedPassword; // Setting the hashed password
    const newUser = await User.create(req.body);
    const userWithoutPwd = await User.findById(newUser._id).select('-pwdHash');
    res.status(201).json(userWithoutPwd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-pwdHash');
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-pwdHash');
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    let updateFields = req.body;
    if (req.body.pwdHash) {
      const hashedPassword = await bcrypt.hash(req.body.pwdHash, 10); // Hashing the password
      updateFields.pwdHash = hashedPassword; // Setting the hashed password
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    ).select('-pwdHash');
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

