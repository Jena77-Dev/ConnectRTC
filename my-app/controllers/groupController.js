const protect = require("../middleware/protect");
const Group = require("../models/groupModel");
const Message = require('../models/messageModel');

// Create a new group
exports.createGroup = async (req, res) => {
    try {
        const { name, members, createdBy } = req.body;
        const group = new Group({ name, members, createdBy });
        await group.save();
        res.status(201).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all groups for a user
// exports.getUserGroups = async (req, res) => {
//     try {
//         const groups = await Group.find({ members: req.parama.userId });
//         res.json(groups);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
exports.getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params; // This should work if route matches
    const groups = await Group.find({ members: userId });
    res.status(200).json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get messages for a group
exports.getGroupMessage = async (req, res) => {
    try {
        const messages = await Message.find({ groupId: req.params.groupId }).populate('senderId', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Send a message to a group
exports.sendGroupMessage = async (req, res) => {
    try {
        const { senderId, text } = req.body;
        const message = new Message({ groupId: req.params.groupId, senderId, text });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}


