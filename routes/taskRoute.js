import taskController from "../controllers/taskController.js";
import getUser from "../middlewares/userMidd.js";
import getTask from "../middlewares/taskMidd.js";
import getProject from "../middlewares/projectMidd.js";
import taskJoi from "../joi/taskJoi.js";
import express from "express";
const router = express.Router();

router.param("userId", getUser);
router.param("taskId", getTask);
router.param("projectId", getProject);

router.post(
  "/createTask",
  taskJoi.createTaskValidation,
  taskController.createTask
);

router.get("/getByTaskId/:taskId", taskController.getByTaskId);
router.get("/getByAssignedTo/:userId", taskController.getByAssignedTo);
router.get("/getAllTask", taskController.getAllTask);
router.get("/getByFollowers/:userId", taskController.getByFollowers);

router.put(
  "/updateStatus/:taskId",
  taskJoi.updateStatusValidation,
  taskController.updateStatus
);
router.put(
  "/updateTask/:taskId",
  taskJoi.updateReminderValidation,
  taskController.updateTask
);
router.put(
  "/updateReminder/:taskId",
  taskJoi.updateReminderValidation,
  taskController.updateReminder
);

router.delete("/deleteTask/:taskId", taskController.deleteTask);

export default router;
