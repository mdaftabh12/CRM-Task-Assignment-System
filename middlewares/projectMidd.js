import projectModel from "../models/projectModel.js";

const getProject = async (req, res, next) => {
  try {
    let check = await projectModel.findById({ _id: req.params.projectId });
    if (!check) {
      throw {
        status: 404,
        message: "Project Not Found",
      };
    }
    req.projectId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default getProject;
