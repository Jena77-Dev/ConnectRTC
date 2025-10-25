const ws = require("ws");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const Message = require("./models/messageModel.js");///home/vsys-biswajit/chatapp03/my-app/models/messageModel.js
const { clear } = require("console");
const { User } = require("./models/userModel.js");
const Group = require("./models/groupModel.js");
const GroupMessage = require("./models/groupMessage.js")
// const GroupMessage = require("./my-app/controllers/groupMessageController.js")
const createWebSocketServer = (server) => {
  const wss = new ws.WebSocketServer({ server });

  wss.on("connection", (connection, req) => {
    console.log("New WebSocket connection attempt");

    connection.isAlive = true;

    // Add error handler
    connection.on("error", (error) => {
      console.error("WebSocket connection error:", error);
    });

    connection.on("close", () => {
      console.log("WebSocket connection closed");
      clearInterval(connection.timer);
      clearTimeout(connection.deathTimer);
      notifyAboutOnlinePeople();

      // Delay user cache cleanup to prevent race conditions
      setTimeout(() => {
        if (connection.userId) {
          userCache.delete(connection.userId); // Clear from cache
        }
      }, 5000);
    });

    const userCache = new Map(); // Cache user data to reduce DB calls

    const notifyAboutOnlinePeople = async () => {
      try {
        const onlineUsers = await Promise.all(
          Array.from(wss.clients)
            .filter(client => client.userId) // Only include authenticated users
            .map(async (client) => {
              try {
                const { userId, username } = client;

                // Use cached data if available
                if (userCache.has(userId)) {
                  return userCache.get(userId);
                }

                const user = await User.findById(userId);
                if (!user) return null;

                const userData = {
                  userId,
                  username: user.username || `${user.firstName} ${user.lastName}`,
                  avatarLink: user.avatarLink || null,
                };
                userCache.set(userId, userData);
                return userData;
                // return {
                //   userId,
                //   username,
                //   avatarLink: user?.avatarLink || null,
                // };
              } catch (error) {
                console.error("Error fetching user data:", error);
                return null;
              }
            })
        );

        const validUsers = onlineUsers.filter(user => user !== null);

        // Broadcast to all clients
        [...wss.clients]
          .filter(client => client.readyState === ws.OPEN)
          .forEach((client) => {
            try {
              client.send(JSON.stringify({ type: "online", online: validUsers }));
            } catch (error) {
              console.error("Error sending online users:", error);
            }
          });
      } catch (error) {
        console.error("Error in notifyAboutOnlinePeople:", error);
      }
    };

    // Improved authentication
    const cookies = req.headers.cookie;
    if (cookies) {
      const tokenString = cookies
        .split(";")
        .find((str) => str.trim().startsWith("authToken="));

      if (tokenString) {
        const token = tokenString.split("=")[1];
        jwt.verify(token, process.env.JWTPRIVATEKEY, {}, (err, userData) => {
          if (err) {
            console.error("JWT verification failed:", err);
            connection.close(1008, "Invalid token");
            return;
          }

          if (!userData || !userData._id) {
            console.error("Invalid user data in token");
            connection.close(1008, "Invalid user data");
            return;
          }

          const { _id, firstName, lastName } = userData;
          connection.userId = _id;
          connection.username = `${firstName} ${lastName}`;

          console.log(`User authenticated: ${connection.username}`);
          notifyAboutOnlinePeople();
        });
      } else {
        console.log("No auth token found");
        connection.close(1008, "No authentication token");
        return;
      }
    } else {
      console.log("No cookies found");
      connection.close(1008, "No authentication");
      return;
    }

    // <<<<---------------- Before the Group chat feature implementation------------------>>>>>>
    // connection.on("message", async (message) => {
    //   const messageData = JSON.parse(message.toString());
    //   const { recipient, text } = messageData;
    //   const msgDoc = await Message.create({
    //     sender: connection.userId,
    //     recipient,
    //     text,
    //   });

    //   if (recipient && text) {
    //     [...wss.clients].forEach((client) => {
    //       if (client.userId === recipient) {
    //         client.send(
    //           JSON.stringify({
    //             sender: connection.username,
    //             text,
    //             id: msgDoc._id,
    //           })
    //         );
    //       }
    //     });
    //   }
    // });
    //<<<<---------------- Before the Group chat feature implementation------------------>>>>>>


    //<<<<---------------- After the Group chat feature implementation------------------>>>>>>
    connection.on("message", async (message) => {
      let messageData;
      try {
        messageData = JSON.parse(message.toString());
      } catch (err) {
        console.error("Invalid message JSON:", err);
        return;
      }

      const { type, recipient, groupId, text } = messageData;

      if (!text) return;

      if (type === "private" && recipient) {
        // Save to DB
        const msgDoc = await Message.create({
          sender: connection.userId,
          recipient,
          text,
        });

        // Send to recipient (and optionally to sender)
        [...wss.clients].forEach((client) => {
          if (client.userId === recipient || client.userId === connection.userId) {
            client.send(
              JSON.stringify({
                type: "private",
                sender: connection.username,
                senderId: connection.userId,
                recipient,
                text,
                id: msgDoc._id,
                createdAt: msgDoc.createdAt,
              })
            );
          }
        });
      } else if (type === "group" && groupId) {
        // Save to group messages collection
        const groupMsgDoc = await GroupMessage.create({
          sender: connection.userId,
          groupId,
          text,
        });

        // Find all group members (assuming you have a Group model)
        const group = await Group.findById(groupId);
        if (!group) return;

        // Send to all group members who are online
        group.members.forEach((memberId) => {
          [...wss.clients].forEach((client) => {
            if (client.userId === memberId.toString()) {
              client.send(
                JSON.stringify({
                  type: "group",
                  sender: connection.username,
                  senderId: connection.userId,
                  groupId,
                  text,
                  id: groupMsgDoc._id,
                  createdAt: groupMsgDoc.createdAt,
                })
              );
            }
          });
        });
      }
    });
  //<<<<---------------- After the Group chat feature implementation------------------>>>>>>

    notifyAboutOnlinePeople();
    // Sending online user list to all clients

    // Log online users to the console
    // console.log("Online Users:", onlineUsers);
  });
};

module.exports = createWebSocketServer;