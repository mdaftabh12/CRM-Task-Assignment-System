import projectController from "../controllers/projectController.js";
import getTeam from "../middlewares/teamMidd.js";
import getProject from "../middlewares/projectMidd.js";
import projectJoi from "../joi/projectJoi.js";
import express from "express";
const router = express.Router();

router.param("teamId", getTeam);
router.param("projectId", getProject);

router.post(
  "/createProject/:teamId",
  projectJoi.createProjectValidation,
  projectController.createProject
);

router.get("/getByProjectId/:projectId", projectController.getByProjectId);
router.get("/getAllProject", projectController.getAllProject);

router.put(
  "/updateProject/:projectId/:teamId",
  projectJoi.updateProjectValidation,
  projectController.updateProject
);

export default router;
