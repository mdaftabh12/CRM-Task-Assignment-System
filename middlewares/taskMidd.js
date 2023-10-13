import taskModel from "../models/taskModel.js";

const getTask = async (req, res, next) => {
  try {
    let check = await taskModel.findById({ _id: req.params.taskId });
    if (!check) {
      throw {
        status: 404,
        message: "Task Not Found",
      };
    }
    req.taskId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export default getTask;
