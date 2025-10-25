import React, { useState, useEffect } from "react";
import Avatar from "./Avatar";
import Contact from "./Contact";
import CreateGroup from "../GroupChat/CreateGroup";
import { useProfile } from "../../context/profileContext";


const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
  setSelectedUser,
  selectedGroupId,
  setSelectedGroup,
  setSelectedGroupId,
  groups
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { userDetails } = useProfile();

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId].username || "";
    // const { firstName, lastName } = onlinePeople[userId];
    // const fullName = `${firstName} ${lastName}`;
    console.log("Online User:", userId, username);

    // return fullName.toLowerCase().includes(searchTerm.toLowerCase());
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // console.log("Online People:", filteredOnlinePeople);


  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId];
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  

  // useEffect(() => {
  //   const fetchGroups = async () => {
  //     try {
  //       const data = await getUserGroupsApi(userDetails._id);
  //       setGroups(data);
  //     } catch (error) {
  //       setGroups([]);
  //       console.error("Failed to fetch groups:", error.message);
  //     }
  //   };

  //   if (userDetails?._id) {
  //     fetchGroups();
  //   }
  // }, [userDetails]);

  return (
    <section className="w-[29%] py-3 border-r px-2 lg:px-4 border-gray-700 ">
      {/* <section className="w-[29%] min-w-[240px] max-w-[300px] h-screen flex flex-col px-4 py-3 border-r border-gray-700"> */}
      <div className=" flex items-center gap-2 p-1 px-2 lg:p-3 mt-1 mb-3 lg:mb-6 ml-1">
        <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ConnectRTC
        </h1>
      </div>
      <div className="text-white flex items-center gap-2 p-1 px-2 lg:p-3 mt-1 mb-3 lg:mb-6 bg-primary w-[90%] mx-auto rounded-2xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden sm:block"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none"
        />
        
      </div>

      

      <div className="h-[calc(100vh-200px)] overflow-y-auto no-scrollbar">
        <div className="flex pl-4 justify-start items-center">
          <CreateGroup
            userDetails={userDetails} />
        </div>
        {/* Render groups first */}
        {filteredGroups.map((group) => (
          <Contact
            key={group._id}
            userId={group._id}
            username={group.name}
            isOnline={null} // or false
            avatarLink={group?.avatarLink}
            isGroup={true}
            setSelectedUserId={setSelectedUserId}
            setSelectedUser={setSelectedUser}
            selectedGroupId={selectedGroupId}
            setSelectedGroup={setSelectedGroup}
            setSelectedGroupId={setSelectedGroupId} 
          />
        ))}

        {filteredOnlinePeople.map((userId) => {
          const { username, avatarLink } = onlinePeople[userId];
          console.log(userId)
          return (
            <Contact
              key={userId}
              userId={userId}
              username={username}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              setSelectedUser={setSelectedUser}
              setSelectedGroupId={setSelectedGroupId} 
              setSelectedGroup={setSelectedGroup}
              isOnline={true}
              isGroup={false}
              avatarLink={avatarLink} 
            />
          );
        })}
        {filteredOfflinePeople.map((userId) => {
          const { _id, firstName, lastName, avatarLink } =
            offlinePeople[userId];
          return (
            <Contact
              key={_id}
              userId={_id}
              username={`${firstName} ${lastName}`}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              setSelectedUser={setSelectedUser}
              setSelectedGroupId={setSelectedGroupId} 
              setSelectedGroup={setSelectedGroup}
              isOnline={false}
              isGroup={false}
              avatarLink={avatarLink}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OnlineUsersList;