import teamController from "../controllers/teamController.js";
import getUser from "../middlewares/userMidd.js";
import getTeam from "../middlewares/teamMidd.js";
import createTeamValidation from "../joi/teamJoi.js";
import express from "express";
const router = express.Router();

router.param("userId", getUser);
router.param("teamId", getTeam);

router.post(
  "/createTeam/:userId",
  createTeamValidation,
  teamController.createTeam
);

router.get("/getByTeamId/:teamId", teamController.getByTeamId);
router.get("/getAllTeam", teamController.getAllTeam);

router.put("/joinTeam/:teamId/:userId", teamController.joinTeam);

router.delete("/removeTeam/:teamId/:userId", teamController.removeTeam);
router.delete("/deleteTeam/:teamId", teamController.deleteTeam);

export default router;
