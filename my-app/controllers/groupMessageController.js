const Group = require("../models/groupModel");
const GroupMessage = require('../models/groupMessage');

// Send a message to a group
exports.sendGroupMessage = async (req, res) => {
    try {
        const { senderId, text } = req.body;
        const message = new GroupMessage({
            groupId: req.params.groupId,
            senderId,
            text
        });
        await message.save();
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get messages for a group
exports.getGroupMessage = async (req, res) => {
    try {
        const messages = await GroupMessage.find({ groupId: req.params.groupId })
            .populate('sender', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}