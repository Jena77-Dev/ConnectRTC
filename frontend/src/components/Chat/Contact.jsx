import React from "react";
import Avatar from "./Avatar";

const Contact = ({
  userId,
  username,
  selectedUserId,
  setSelectedUserId,
  setSelectedUser,
  isOnline,
  avatarLink,
  isGroup,
  selectedGroupId,
  setSelectedGroupId,
  setSelectedGroup,
}) => {

  const isSelected = isGroup ? selectedGroupId === userId : selectedUserId === userId;
  // const isSelected = isGroup
  //   ? selectedGroupId === userId
  //   : selectedUserId === userId;

  
  return (
    <li
      key={userId}
      className={`${(isSelected) ? "bg-primary" : ""} 
      capitalize py-2 lg:py-3 px-2 lg:px-5  rounded-[1.3rem]  border-gray-300
       hover:bg-primary flex flex-col lg:flex-row items-center gap-1 my-1.5 
       lg:gap-4 font-medium hover:cursor-pointer lg:my-3 text-white `}
      onClick={() => {
        if (isGroup) {
          console.log("isSelected isGroup?:--->", isGroup);
          setSelectedGroupId(userId);
          setSelectedGroup({ userId, username, avatarLink });
          setSelectedUserId(null); // Deselect user
          setSelectedUser(null);
        } else {
          setSelectedUserId(userId);
          setSelectedUser({ userId, username, isOnline, avatarLink });
          setSelectedGroupId(null); // Deselect group
          setSelectedGroup(null);
        }
      }}
    >
      <Avatar
        userId={userId}
        username={username}
        isOnline={isOnline}
        avatarLink={avatarLink}
      />
      <span className="text-xs lg:text-base text-center">{username}</span>
      {isOnline && (
        <span
          className={`text-xs rounded-full bg-green-500 px-2 py-0.5  z-20 
        }`}
        >
          Active
        </span>
      )}
    </li>
  );
};

export default Contact;