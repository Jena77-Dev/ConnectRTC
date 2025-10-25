const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');
const groupMessageController = require('../controllers/groupMessageController')

// Create a group
router.post('/create', groupController.createGroup);

// Get all groups for a user
router.get('/user/:userId',groupController.getUserGroups);

// Get messages for a group
router.get('/:groupId/messages', groupMessageController.getGroupMessage);

// send message to a group
router.post('/:groupId/messages',groupMessageController.sendGroupMessage);

module.exports = router;
