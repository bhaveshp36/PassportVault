const Member = require("../models/member.model.js");

exports.createMember = async (req, res) => {
  const member = new Member(req.body);
  try {
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.send(members);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).send();
    }
    res.send(member);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) {
      return res.status(404).send();
    }
    res.send(member);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).send();
    }
    res.send(member);
  } catch (error) {
    res.status(500).send(error);
  }
};
