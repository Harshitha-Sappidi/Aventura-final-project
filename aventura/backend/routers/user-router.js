import express from "express";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route('/signup').post(userController.registerUser);

router.route('/login').post(userController.loginUser);

router.route('/email/:email').get(userController.getUserByEmail);

router.route('/profile').put(userController.updateUserByEmail);

router.route('/auth/google-login').post(userController.googleLogin);

export default router;