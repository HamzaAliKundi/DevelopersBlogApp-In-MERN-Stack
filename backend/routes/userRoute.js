const express = require("express");
const router = express.Router();

const {
   registerUser,
   loginUser,
   googleLogin,
   activateAccount,
} = require("../controller/userController");

router.post("/", registerUser);
// router.post("/emailactivate", activateAccount);
router.post("/login", loginUser);
router.post("/googlelogin", googleLogin);

module.exports = router;
