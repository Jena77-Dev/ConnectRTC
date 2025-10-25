const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const profileController = async (req, res) => {
  const token = req.cookies?.authToken;
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, async (err, userData) => {
      console.log(userData);
      if (err) throw err;
      const user = await User.findOne({ _id: userData._id });
      res.json(user);
    });
  } else {
    res.status(401).json("no token");
  }
};

const profileUpdate = async (req, res) => {
  const token = req.cookies?.authToken;
  if (token) {
    jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
      if (err) throw err;
    });
  } else {
    res.status(401).json("no token");
  }

  const { firstName, lastName, email, avatarLink } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.avatarLink = avatarLink;
    user.bio = req.body.bio || user.bio; // Update bio if provided, otherwise keep existing
    // user.lastSeen = Date.now(); // Update last seen time
    await user.save();
  }
  res.json({
    success: true,
    message: "Profile updated successfully",
    user
  });
};

module.exports = { profileController, profileUpdate };