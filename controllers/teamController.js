import teamModel from "../models/teamModel.js";

//=========  Create Team  =========//

const createTeam = async (req, res) => {
  try {
    let { title, member } = req.body;
    let adminId = req.userId;
    let admin = adminId._id;
    if (!member.includes(admin.toString())) {
      member.push(admin);
    }
    let team = await teamModel.create({
      title: title,
      adminId: admin,
      member: member,
    });

    return res.status(201).json({
      success: false,
      message: "Team has been successfully created.",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by teamId  =========//

const getByTeamId = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Team details retrieved successfully.",
      data: req.teamId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get all teams  =========//

const getAllTeam = async (req, res) => {
  try {
    let teams = await teamModel.find();
    if (!teams.length) {
      return res.status(404).json({
        success: false,
        message: "No teams found. Create a new team to get started.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All teams retrieved successfully.",
      data: teams,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Join team  =========//

const joinTeam = async (req, res) => {
  try {
    let teamId = req.teamId;
    let userId = req.userId;
    const check = await teamModel.findOne({
      _id: teamId._id,
      member: userId._id,
    });
    if (check) {
      return res.status(400).json({
        success: false,
        message: "You are already a member of this team.",
      });
    }
    teamId.member.push(userId._id);
    let team = await teamModel.findByIdAndUpdate(
      { _id: teamId._id },
      {
        $set: {
          member: teamId.member,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "You have successfully joined the team.",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  remove from team  =========//

const removeTeam = async (req, res) => {
  try {
    let teamId = req.teamId;
    let userId = req.userId;
    const check = await teamModel.findOne({
      _id: teamId._id,
      member: userId._id,
    });
    if (!check) {
      return res.status(400).json({
        success: false,
        message: "You are not a member of this team.",
      });
    }
    let element = userId._id;
    const indexToDelete = check.member.indexOf(element);
    let member = check.member.splice(indexToDelete, 1);
    let team = await teamModel.findByIdAndUpdate(
      { _id: teamId._id },
      {
        $set: {
          member: check.member,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "You have been successfully removed from the team.",
      data: team,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Delete teams  =========//

const deleteTeam = async (req, res) => {
  try {
    let team = await teamModel.deleteOne({ _id: req.params.teamId });

    if (team.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Team not found or has already been deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Team has been successfully deleted.",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Export  =========//

export default {
  createTeam,
  getByTeamId,
  getAllTeam,
  joinTeam,
  removeTeam,
  deleteTeam,
};
