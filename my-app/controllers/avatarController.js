const Avatar = require("../models/avatars");

async function avatarController(req, res) {
  const { link } = req.body;

  // Check if the link is provided
  if (!link) {
    return res.status(400).json({ error: "Link is required" });
  }

  try {
    // Create a new avatar entry in the database
    const newAvatar = new Avatar({ link });
    await newAvatar.save();

    // Return success response
    return res
      .status(201)
      .json({ success: true, message: "Avatar link added successfully" });
  } catch (error) {
    // Handle duplicate key error (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(409).json({ 
        success: false,
        error: "Avatar with this link already exists" 
      });
    }
    
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

// async function getAllAvatars(req, res) {
//   try {
//     // Fetch all avatars from the database
//     const avatars = await Avatar.find();

//     // If no avatars exist, create default ones
//     if (avatars.length === 0) {
//       const defaultAvatars = [
//         { link: "https://i.imgur.com/qGsYvAK.png" },
//         { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
//         { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
//         { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
//         { link: "https://api.dicebear.com/7.x/personas/svg?seed=1" },
//       ];

//       // Insert default avatars
//       avatars = await Avatar.insertMany(defaultAvatars);
//       console.log('Default avatars created');
//     }
//     // Return the list of avatars
//     return res.status(200).json({ success: true, avatars });
//   } catch (error) {
//     // Handle any errors that occur during the process
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// }

async function getAllAvatars(req, res) {
  try {
    // Fetch all avatars from the database
    let avatars = await Avatar.find();

    // If no avatars exist, create default ones
    if (avatars.length === 0) {
      const defaultAvatars = [
        { link: "https://i.imgur.com/qGsYvAK.png" },
        { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=1" },
        { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=2" },
        { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=3" },
        { link: "https://api.dicebear.com/7.x/personas/svg?seed=1" },
        { link: "https://api.dicebear.com/7.x/personas/svg?seed=2" },
        { link: "https://api.dicebear.com/7.x/personas/svg?seed=3" },
        { link: "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian" },
        { link: "https://api.dicebear.com/9.x/adventurer/svg?seed=Emery" },
        { link: "https://api.dicebear.com/9.x/adventurer/svg?seed=Charlie" },
        { link: "https://api.dicebear.com/9.x/adventurer/svg?seed=Chase" },
      ];
// ------------------------------------------------------------------------
      // Find which avatars don't exist and add only those
      // for (const avatarData of defaultAvatars) {
      //   const exists = await Avatar.findOne({ link: avatarData.link });
      //   if (!exists) {
      //     await Avatar.create(avatarData);
      //     console.log(`Added new avatar: ${avatarData.link}`);
      //   }
      // }
      // Fetch updated list
      // avatars = await Avatar.find();
    
      // Insert default avatars
      avatars = await Avatar.insertMany(defaultAvatars);
      console.log('Default avatars created');
    }

    console.log('Returning avatars:', avatars.length);

    // Return the list of avatars
    return res.status(200).json({ success: true, avatars });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}



async function seedAvatars(req, res) {
  try {
    // Check if avatars already exist
    const existingCount = await Avatar.countDocuments();
    
    if (existingCount > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Avatars already exist in database" 
      });
    }

    const defaultAvatars = [
      { link: "https://i.imgur.com/qGsYvAK.png" },
      { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=felix" },
      { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=aneka" },
      { link: "https://api.dicebear.com/7.x/avataaars/svg?seed=chester" },
      { link: "https://api.dicebear.com/7.x/personas/svg?seed=john" },
    ];

    const createdAvatars = await Avatar.insertMany(defaultAvatars);

    return res.status(201).json({ 
      success: true, 
      message: `${createdAvatars.length} default avatars created`,
      avatars: createdAvatars 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { avatarController, getAllAvatars, seedAvatars };