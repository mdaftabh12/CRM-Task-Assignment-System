import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";

//=========  Create task  =========//

const createTask = async (req, res) => {
  try {
    let {
      startDate,
      discription,
      endDate,
      projectId,
      subject,
      assignedTo,
      followers,
    } = req.body;
    if (!assignedTo) {
      return res
        .status(400)
        .json({ success: false, message: "assignedTo is required" });
    }
    let user = await userModel.findById({ _id: req.body.assignedTo });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    let project = await projectModel.findById({ _id: req.body.projectId });
    if (!project) {
      return res
        .status(400)
        .json({ success: false, message: "project not found" });
    }
    let startDates = new Date(startDate);
    let endDates = new Date(endDate);
    let task = await taskModel.create({
      subject: subject,
      projectId: projectId,
      assignedTo: assignedTo,
      startDate: new Date(
        startDates.getFullYear(),
        startDates.getMonth(),
        startDates.getDate() + 1
      ),
      endDate: new Date(
        endDates.getFullYear(),
        endDates.getMonth(),
        endDates.getDate() + 1
      ),
      discription: discription,
      followers: followers,
    });

    return res
      .status(201)
      .json({ success: false, message: "Create task", data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Task update  =========//

const updateStatus = async (req, res) => {
  try {
    let { status } = req.body;
    let taskId = req.taskId;
    let onTimeComplete;
    if (status == "COMPLETE") {
      let date = new Date();
      let endDate = new Date(taskId.endDate);
      if (
        date.getDate() + 1 <= endDate.getDate() &&
        date.getMonth() <= endDate.getMonth() &&
        date.getFullYear() <= endDate.getFullYear()
      ) {
        onTimeComplete = "YES";
      } else {
        onTimeComplete = "NO";
      }
    }
    let task = await taskModel.findByIdAndUpdate(
      { _id: taskId._id },
      {
        $set: {
          status: status,
          onTimeComplete: onTimeComplete,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Status update", data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Task update  =========//

const updateReminder = async (req, res) => {
  try {
    let { reminder } = req.body;
    let taskId = req.taskId;
    let task = await taskModel.findByIdAndUpdate(
      { _id: taskId._id },
      {
        $set: {
          reminder: reminder,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Reminder update", data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Update task  =========//

const updateTask = async (req, res) => {
  try {
    let {
      startDate,
      discription,
      endDate,
      projectId,
      subject,
      assignedTo,
      followers,
    } = req.body;
    let startDates = new Date(startDate);
    let endDates = new Date(endDate);
    let task = await taskModel.findByIdAndUpdate(
      { _id: req.taskId._id },
      {
        $set: {
          subject: subject,
          projectId: projectId,
          assignedTo: assignedTo,
          startDate: new Date(
            startDates.getFullYear(),
            startDates.getMonth(),
            startDates.getDate() + 1
          ),
          endDate: new Date(
            endDates.getFullYear(),
            endDates.getMonth(),
            endDates.getDate() + 1
          ),
          discription: discription,
          followers: followers,
        },
      },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: false, message: "Update task", data: task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by taskId  =========//

const getByTaskId = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Get by taskId",
      data: req.taskId,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by assignedTo  =========//

const getByAssignedTo = async (req, res) => {
  try {
    let data = await taskModel.find({
      assignedTo: req.params.userId,
    });
    return res.status(200).json({
      success: true,
      message: "Get by assignedTo",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by follower  =========//

const getByFollowers = async (req, res) => {
  try {
    let userId = req.userId;
    let data = await taskModel.find({
      $in: { followers: userId._id },
    });
    console.log(data);
    return res.status(200).json({
      success: true,
      message: "Get by followers",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get all tasks  =========//

const getAllTask = async (req, res) => {
  try {
    let task = await taskModel.find();
    return res.status(200).json({
      success: true,
      message: "Get all tasks",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Delete task  =========//

const deleteTask = async (req, res) => {
  try {
    let task = await taskModel.deleteOne({ _id: req.params.taskId });
    return res.status(200).json({
      success: true,
      message: "Delete task",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Export  =========//

export default {
  createTask,
  getByTaskId,
  getAllTask,
  updateStatus,
  updateTask,
  deleteTask,
  getByAssignedTo,
  getByFollowers,
  updateReminder,
};
