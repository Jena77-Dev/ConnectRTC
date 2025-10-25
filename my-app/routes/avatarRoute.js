//avatarRoute.js
const express = require('express');
const avatarController = require('../controllers/avatarController');
const router = express.Router();

router.post("/", avatarController.avatarController);
router.get("/all", avatarController.getAllAvatars);
router.post("/seed", avatarController.seedAvatars);

module.exports = router;