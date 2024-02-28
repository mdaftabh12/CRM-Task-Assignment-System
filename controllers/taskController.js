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
        .json({ success: false, message: "The assigned user does not exist." });
    }
    let project = await projectModel.findById({ _id: req.body.projectId });
    if (!project) {
      return res.status(400).json({
        success: false,
        message: "The specified project does not exist.",
      });
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

    return res.status(201).json({
      success: false,
      message: "Task created successfully.",
      data: task,
    });
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
    return res.status(200).json({
      success: true,
      message: "Task status updated successfully.",
      data: task,
    });
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
    return res.status(200).json({
      success: true,
      message: "Reminder updated successfully.",
      data: task,
    });
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

    return res.status(200).json({
      success: false,
      message: "Task updated successfully.",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get by taskId  =========//

const getByTaskId = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Task details retrieved successfully.",
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

    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for the specified user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks assigned to the user retrieved successfully.",
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
    if (!data || data.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for the specified user as a follower.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tasks followed by the user retrieved successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Get all tasks  =========//

const getAllTask = async (req, res) => {
  try {
    let tasks = await taskModel.find();

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No tasks found for the current user.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "All tasks retrieved successfully for the current user.",
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=========  Delete task  =========//

const deleteTask = async (req, res) => {
  try {
    let task = await taskModel.deleteOne({ _id: req.params.taskId });

    if (!task || task.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Task not found or already deleted.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully.",
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
