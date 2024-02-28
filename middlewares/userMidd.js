import userModel from "../models/userModel.js";

const getUser = async (req, res, next) => {
  try {
    let check = await userModel.findById({ _id: req.params.userId });
    if (!check) {
      throw {
        status: 404,
        message: "The user you are trying to access does not exist.",
      };
    }
    req.userId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default getUser;
