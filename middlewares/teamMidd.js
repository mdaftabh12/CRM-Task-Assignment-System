import teamModel from "../models/teamModel.js";

const getTeam = async (req, res, next) => {
  try {
    let check = await teamModel.findById({ _id: req.params.teamId });
    if (!check) {
      throw {
        status: 404,
        message: "The team you are trying to access does not exist.",
      };
    }
    req.teamId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default getTeam;
