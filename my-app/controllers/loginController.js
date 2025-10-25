const bcrypt = require("bcrypt");
const { User, validateLogin } = require("../models/userModel.js");

const loginController = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });
    // console.log("User found:", user ? "Yes" : "No");
    if (!user) {
      return res.status(401).send({ message: "Invalid Email" });
    }

    // Check password validity using bcrypt
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(401).send({ message: "Invalid Password" });
    }

    // Check if the user's email is verified
    // if (!user.verified) {
    //   return res.status(400).send({ message: "User doesn't exist" });
    // }

    // OPTIONAL: auto-verify in dev mode
    if (!user.verified && process.env.NODE_ENV === 'development') {
      user.verified = true;
      await user.save();
    }

    // If you want to block unverified users in production
    if (!user.verified && process.env.NODE_ENV !== 'development') {
      return res.status(403).json({ status: 403, success: false, message: 'Please verify your email before logging in.' });
    }

    // const emailResult = await User.find({ email: user.email });
    // if ( !emailResult.success && process.env.NODE_ENV === 'development') {
    //   user.verified = true;
    //   await user.save({ message: "Login successful" });
    // }

    // Generate authentication token and send successful login response
    const token = user.generateAuthToken();
    res
      .status(200)
      .cookie("authToken", token, {
        httpOnly: false, // Set to true in production
        sameSite: "none",
        secure: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .json({
        status: 200,
        success: true,
        message: "Login successful", // ✅ This message will show in the frontend toast
        token, // Optional: or remove if you only store it in a cookie
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    // .send({ message: "Login successful", status: 200 });
    return;
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = loginController;