// ChatHome.jsx
import React, { useEffect, useState } from "react";
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from "../components/Chat/MessageInputForm";
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";
import { socketUrl } from "../../apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const [loading, setLoading] = useState(true);
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [allPeople, setAllPeople] = useState({});
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();
  // Get the selected group object
  // const selectedGroup = groups?.find(g => g._id === selectedGroupId);
  const [groups, setGroups] = useState([]);
  const [groupmessages, setGroupMessages] = useState([]);

  const connectToWebSocket = () => {
    const ws = new WebSocket(socketUrl);
    ws.addEventListener("message", handleMessage);
    setWs(ws);
  };


  useEffect(() => {
    connectToWebSocket();
    ws?.addEventListener("close", () => {
      connectToWebSocket();
    });

    // Cleanup function
    // return () => {
    //   if (ws) {
    //     ws.removeEventListener("message", handleMessage);
    //     ws.close();
    //   }
    // };
  }, [userDetails, selectedUserId]);

  useEffect(() => {
    if (selectedGroupId && groups) {
      const group = groups.find(g => g._id === selectedGroupId);
      setSelectedGroup(group || null);
    } else {
      setSelectedGroup(null);
    }
  }, [selectedGroupId, groups]);



  const getUserGroupsApi = async (userId) => {
    // const response = await axios.get(`http://192.168.100.201:5000/api/groups/user/${userId}`);
    const response = await axios.get(`/api/groups/user/${userId}`);
    return response.data;
  };


  const fetchGroups = async () => {
    try {
      const data = await getUserGroupsApi(userDetails._id);
      setGroups(data);
      console.log("get group data:--->", data);

    } catch (error) {
      setGroups([]);
      console.error("Failed to fetch groups:", error.message);
    }
  };

  useEffect(() => {
    if (userDetails?._id) {
      fetchGroups();
    }
  }, [userDetails])



  const getGroupMessagesApi = async (groupId) => {
    // const response = await axios.get(`http://192.168.100.201:5000/api/groups/${groupId}/messages`);
    const response = await axios.get(`/api/groups/${groupId}/messages`);
    return response.data;
  };


  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const data = await getGroupMessagesApi(selectedGroupId);
        console.log("get Group Messages", data);

        setMessages(data);
      } catch (error) {
        setMessages([]);
        console.error("Failed to fetch group messages:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedGroupId) {
      fetchMessages();
    }
  }, [selectedGroupId]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching messages for user:", selectedUserId);
      if (selectedUserId) {
        try {
          // const res = await axios.get(`http://192.168.100.201:4000/api/user/messages/${selectedUserId}`);
          // const res = await axios.get(`http://192.168.100.201:5000/api/user/messages/${selectedUserId}`);
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessages(res.data);
          console.log("Fetched messages:", res.data);

        } catch (error) {
          console.error("Error fetching messages:", error);
          setMessages([]);
        }
      }
    };
    if (selectedUserId) {
      fetchData();
    }

  }, [selectedUserId]);

  useEffect(() => {
    // axios.get("http://192.168.100.201:5000/api/user/people").then((res) => {
    axios.get("/api/user/people").then((res) => {
      console.log(res.data);

      const peopleMap = res.data.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setAllPeople(peopleMap);

      const offlinePeopleArr = res?.data
        .filter((p) => p._id !== userDetails?._id)
        .filter((p) => !onlinePeople[p._id]);

      const offlinePeopleWithAvatar = offlinePeopleArr.map((p) => ({
        ...p,
        avatarLink: p.avatarLink, // assuming avatarLink is a property of p
      }));

      setOfflinePeople(
        offlinePeopleWithAvatar.reduce((acc, p) => {
          acc[p._id] = p;
          return acc;
        }, {})
      );
      
    });
  }, [onlinePeople, userDetails]);

  useEffect(() => {
    const selectedGroup = groups?.find(g => g._id === selectedGroupId);

    // const handleRealTimeMessage = (event) => {
    //   const messageData = JSON.parse(event.data);
    //   console.log('Received message data:', messageData);
    //   if (!messageData.text) {
    //     console.error('Message received without text content:', messageData);
    //     return;
    //   }
    //   const userIdMap = {
    //     ...Object.entries(onlinePeople).reduce((acc, [id, data]) => {
    //       acc[data.username] = id;
    //       return acc;
    //     }, {}),
    //     ...Object.entries(offlinePeople).reduce((acc, [id, data]) => {
    //       acc[data.username] = id;
    //       return acc;
    //     }, {})
    //   };

    //   // If we receive a message with sender name, convert it to ID
    //   // const senderId = userIdMap[messageData.sender] || messageData.sender;

    //   // Get the actual sender ID - check both sender and senderId fields
    //   const senderId = messageData.senderId || userIdMap[messageData.sender] || messageData.sender;

    //   // Skip if this is our own message
    //   if (senderId === userDetails._id) {
    //     console.log('Skipping own message - sender is current user');
    //     return;
    //   }

    //   // if (senderId !== userDetails._id) {}
    //   // --- GROUP CHAT LOGIC ---
    //   const isGroupMessage = messageData.type === "group" && messageData.groupId;
    //   let isRelevantMessage = false;

    //   if (isGroupMessage && messageData.groupId === selectedGroupId) {
    //     console.log('Group message check:', { 
    //       selectedGroupId, 
    //       messageGroupId: messageData.groupId,
    //       senderId,
    //       currentUserId: userDetails._id,
    //       isSameUser: senderId === userDetails._id
    //     });

    //     // Only show if user is a member of the group
    //     if (selectedGroup && selectedGroup.members.includes(userDetails._id)) {
    //       // For group messages from other users, set isRelevantMessage to true
    //       isRelevantMessage = true;
    //     }
    //   } else {
    //     // --- PRIVATE CHAT LOGIC ---
    //     isRelevantMessage = (
    //       senderId === selectedUserId ||
    //       (messageData.recipient === selectedUserId && senderId === userDetails._id)
    //     );
    //   }

    //   // Determine if this message is relevant to current chat
    //   // const isRelevantMessage = (
    //   //   senderId === selectedUserId ||
    //   //   (messageData.recipient === selectedUserId && senderId === userDetails._id)||
    //   //   senderId === selectedGroupId
    //   // );

    //   console.log('Message processing:', {
    //     senderId,
    //     selectedUserId,
    //     currentUserId: userDetails._id,
    //     isRelevantMessage,
    //     messages,
    //     selectedGroupId
    //   });

    //   if (isRelevantMessage) {
    //     const formattedMessage = {
    //       sender: senderId,
    //       recipient: messageData.recipient || selectedUserId,
    //       text: messageData.text,
    //       createdAt: messageData.createdAt || new Date().toISOString()
    //     };

    //     setMessages(prev => [...prev, formattedMessage]);
    //   }
    // };


    const handleRealTimeMessage = (event) => {
      const messageData = JSON.parse(event.data);
      console.log('Received message data:', messageData);
      if (!messageData.text) {
        console.error('Message received without text content:', messageData);
        return;
      }

      const userIdMap = {
        ...Object.entries(onlinePeople).reduce((acc, [id, data]) => {
          acc[data.username] = id;
          return acc;
        }, {}),
        ...Object.entries(offlinePeople).reduce((acc, [id, data]) => {
          acc[data.username] = id;
          return acc;
        }, {})
      };

      // Get the actual sender ID - check both sender and senderId fields
      const senderId = messageData.senderId || userIdMap[messageData.sender] || messageData.sender;

      // Only process if this is NOT our own message
      if (senderId !== userDetails._id) {
        // --- GROUP CHAT LOGIC ---
        const isGroupMessage = messageData.type === "group" && messageData.groupId;
        let isRelevantMessage = false;

        if (isGroupMessage && messageData.groupId === selectedGroupId) {
          console.log('Group message check:', {
            selectedGroupId,
            messageGroupId: messageData.groupId,
            senderId,
            currentUserId: userDetails._id,
            isSameUser: senderId === userDetails._id
          });

          // Only show if user is a member of the group
          if (selectedGroup && selectedGroup.members.includes(userDetails._id)) {
            isRelevantMessage = true;
          }
        } else if (!isGroupMessage) {  // Add this check
          // --- PRIVATE CHAT LOGIC ---
          isRelevantMessage = (senderId === selectedUserId);
          // Note: removed the second condition since we already know senderId !== userDetails._id
        }

        console.log('Message processing:', {
          senderId,
          selectedUserId,
          currentUserId: userDetails._id,
          isRelevantMessage,
          messages,
          selectedGroupId
        });

        if (isRelevantMessage) {
          const formattedMessage = {
            sender: senderId,
            recipient: messageData.recipient || selectedUserId,
            text: messageData.text,
            createdAt: messageData.createdAt || new Date().toISOString(),
            //  Preserve the message type and group info
            type: messageData.type,
            groupId: messageData.groupId,
            _id: messageData.id || messageData._id
          };

          setMessages(prev => [...prev, formattedMessage]);
        }
      } else {
        console.log('Skipping own message - sender is current user');
      }
    };

    if (ws) {
      ws.addEventListener("message", handleRealTimeMessage);
    }

    return () => {
      // Remove the event listener when component unmounts
      if (ws) {
        ws.removeEventListener("message", handleRealTimeMessage);
      }
    };
  }, [ws, selectedUserId, selectedGroupId, userDetails, selectedGroup]);


  const showOnlinePeople = async (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetails?._id) {
        people[userId] = {
          username,
          avatarLink, // include avatarLink for online users
        };
      }
    });
    setOnlinePeople(people);
  };

  // const handleMessage = (ev) => {
  //   const messageData = JSON.parse(ev.data);
  //   if ("online" in messageData) {
  //     showOnlinePeople(messageData.online);
  //   } else if ("text" in messageData) {
  //     if (messageData.sender === selectedUserId || messageData.sender === selectedGroupId) {
  //       setMessages((prev) => [...prev, { ...messageData }]);//selectedGroup.members.includes(userDetails._id)
  //     }
  //   }
  // };


  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);

    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
      return;
    }

    // Add null check for userDetails
    if (!userDetails || !userDetails._id) {
      console.log('User details not available yet');
      return;
    }

    // if ("text" in messageData) {
    //   if (messageData.senderId === userDetails._id) {
    //     console.log('Skipping own message echo from server');
    //     return;
    //   }
    //   // Private chat
    //   if ((messageData.sender === selectedUserId && messageData.recipient === userDetails._id)) {
    //     // Message sent by the selected user to you
    //     setMessages((prev) => [...prev, { ...messageData }]);
    //     return;
    //   }
    //   // Group chat
    //   if (messageData.groupId === selectedGroupId && groups.find(g => g._id === selectedGroupId)?.members.includes(userDetails._id)) {
    //     setMessages((prev) => [...prev, { ...messageData }]);
    //     return;
    //   }
    // }
  };

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    const trimmed = newMessage.trim();
    if (!trimmed || (!selectedUserId && !selectedGroupId)) return;

    let messageData = {
      text: trimmed,
      sender: userDetails._id,
      createdAt: new Date().toISOString(),
      isRelevantMessage: false
    };

    if (selectedUserId) {
      // Private chat
      messageData = {
        ...messageData,
        type: "private",
        recipient: selectedUserId,
      };
    } else if (selectedGroupId) {
      // Group chat
      messageData = {
        ...messageData,
        type: "group",
        groupId: selectedGroupId,
        recipient: selectedGroupId
      };
    }
    console.log(newMessage, selectedUserId, selectedGroupId);
    ws.send(JSON.stringify(messageData));
    setNewMessage("");
    setMessages((prev) => [...prev, messageData]);
  };


  useEffect(() => {
    checkAuth();
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex min-h-screen  bg-background ">
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        setSelectedUser={setSelectedUser}
        offlinePeople={offlinePeople}
        groups={groups}
        setSelectedGroup={setSelectedGroup}
        selectedGroupId={selectedGroupId}
        setSelectedGroupId={setSelectedGroupId}
      />
      <section className="w-[71%] lg:w-[62%] flex-1 overflow-hidden relative pb-10">
        {(selectedUserId || selectedGroupId) && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
            allPeople={allPeople}
            selectedUser={selectedUser}
            selectedGroupId={selectedGroupId}
            setSelectedGroupId={setSelectedGroupId}
            setSelectedGroup={setSelectedGroup}
            groups={groups}
          />
        )}

        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
          selectedUser={selectedUser}
          selectedGroupId={selectedGroupId}
          groups={groups}
          onlinePeople={onlinePeople}
          offlinePeople={offlinePeople}
        />
        <div className="absolute w-full bottom-0 flex justify-center items-center">
          {(selectedUserId || selectedGroupId) && (
            <MessageInputForm
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessage={sendMessage}
              selectedUserId={selectedUserId}
              selectedGroupId={selectedGroupId}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatHome;