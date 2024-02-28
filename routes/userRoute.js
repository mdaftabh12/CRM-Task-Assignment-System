import userController from "../controllers/userController.js";
import getUser from "../middlewares/userMidd.js";
import upload from "../middlewares/multer.js";
import userJoi from "../joi/userJoi.js";
import express from "express";
const router = express.Router();

router.param("userId", getUser);

router.post(
  "/register",
  userJoi.userRegisteValidator,
  upload.single("image"),
  userController.register
);
router.post("/login", userJoi.userLoginValidator, userController.login);
router.post("/logout", userController.logout);

router.get("/getByUserId/:userId", userController.getByUserId);
router.get("/getAllUser", userController.getAllUser);

router.put(
  "/updateUser/:userId",
  upload.single("image"),
  userJoi.updateUserValidator,
  userController.updateUser
); 
router.put(
  "/forgetPassword",
  userJoi.userForgetPasswordValidator,
  userController.forgetPassword
);
router.put("/disableUser/:userId", userController.disableUser);

export default router;
