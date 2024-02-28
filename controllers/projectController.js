import projectModel from "../models/projectModel.js";
import taskModel from "../models/taskModel.js";

//=========  Create project  =========//

const createProject = async (req, res) => {
  try {
    let { title } = req.body;
    let teamId = req.teamId;
    let project = await projectModel.create({
      title: title,
      teamId: teamId._id,
    });
    return res.status(201).json({
      success: false,
      message: "Project created successfully.",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  User project  =========//

const updateProject = async (req, res) => {
  try {
    // let { task } = req.body;
    let teamId = req.teamId;
    let projectId = req.projectId;
    // projectId.task.push(task);
    let project = await projectModel.findByIdAndUpdate(
      { _id: projectId._id },
      {
        $set: {
          teamId: teamId._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Project updated successfully.",
      data: project,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by projectId  =========//

const getByProjectId = async (req, res) => {
  try {
    let projectId = req.projectId;
    let task = await taskModel.find({ projectId: projectId._id });
    for (let i = 0; i < task.length; i++) {
      projectId.task.push(task[i]._id);
    }
    let updateProject = await projectModel.findByIdAndUpdate(
      { _id: projectId._id },
      { $set: { task: projectId.task } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Project details retrieved successfully.",
      data: updateProject,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get all projects  =========//

const getAllProject = async (req, res) => {
  try {
    let projects = await projectModel.find();

    if (!projects || projects.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No projects found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All projects retrieved successfully.",
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Export  =========//

export default {
  createProject,
  getByProjectId,
  getAllProject,
  updateProject,
};
