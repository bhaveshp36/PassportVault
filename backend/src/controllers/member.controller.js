const Member = require("../models/member.model.js");

exports.createMember = async (req, res) => {
  const member = new Member(req.body);
  try {
    await member.save();
    res.status(201).send(member);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    let membersObj = members.map((member) => member.toObject());
    membersObj.forEach((member) => {
      if (member.joiningDate) {
        member.joiningDate = member.joiningDate.toISOString().split("T")[0];
      }
      if (member.birthDate) {
        member.birthDate = member.birthDate.toISOString().split("T")[0];
      }
    });
    res.send(membersObj);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getMember = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).send();
    }
    let memberObj = member.toObject();
    if (memberObj.joiningDate instanceof Date) {
      memberObj.joiningDate = memberObj.joiningDate.toISOString().split("T")[0];
    }
    if (memberObj.birthDate instanceof Date) {
      memberObj.birthDate = memberObj.birthDate.toISOString().split("T")[0];
    }

    res.send(memberObj);
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
};
