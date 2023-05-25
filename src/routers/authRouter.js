const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");
const { authChecking } = require("../midderware/authChecking");


/**
 *@api/v1/auth/google
 *@rescription : login with google 
*/
authRouter.route("/google").post(authController.loginWithGoogle);
/**
 * @pi v1/auth/profile
 * @rescription : show data acount admin 
 */
authRouter.route("/profile").get(authChecking, authController.getMyProfile);

module.exports = authRouter;
