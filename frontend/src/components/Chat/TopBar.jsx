import React from 'react'
import { useProfile } from '../../context/profileContext';
import { UserRound } from 'lucide-react';
import Avatar from './Avatar';
import AvatarCl from './AvatarCl';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import UserDetailsDialog from './UserDetailsDialog';



const TopBar = ({ setSelectedUserId, selectedUserId, offlinePeople, onlinePeople, lastSeenText, selectedUser,
  selectedGroupId, groups, setSelectedGroupId, allPeople }) => {

  const [openDialog, setOpenDialog] = useState(false);
  const [userData, setUserData] = useState({})
  const { userDetails } = useProfile();
  // Find group info if group is selected
  const selectedGroup = selectedGroupId ? groups.find((g) => g._id === selectedGroupId) : null;

  // Find user info if user is selected
  const user = offlinePeople?.[selectedUserId];
  console.log("group users:---->", selectedGroup)
  console.log('user:-------->', selectedUser);
  // const lastSeen = user?.updatedAt ? formatDistanceToNow(parseISO(user.updatedAt), { addSuffix: true }) : null;
  let fallbackSeenText = null;
  // Fallback to updatedAt (when no messages exist)
  if (user?.updatedAt) {
    fallbackSeenText = formatDistanceToNow(parseISO(user.updatedAt), { addSuffix: true });
  }
  // console.log('fallbackSeenText:-------->', fallbackSeenText);
  // console.log('lastSeenText:-------->', lastSeenText);

  const handleOpenDialog = (userData) => {
    setUserData(userData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle back button: clear user or group selection
  const handleBack = () => {
    if (selectedGroupId) {
      setSelectedGroupId(null);
    }
    if (selectedUserId) {
      setSelectedUserId(null);
    }
  };

  // If nothing is selected, don't render
  if (!selectedUserId && !selectedGroupId) return null;

  return (
    <div className="absolute right-0 text-white w-full py-5 bg-transparent z-20 backdrop-blur-xl flex items-center px-5 gap-2 text-lg font-semibold border-b border-gray-700 capitalize">
      {/* Back button */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
        role="button"
        onClick={handleBack}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
        />
      </svg>

      {/* Group Chat TopBar */}
      {selectedGroupId && !selectedUser && (
        <>
          {selectedGroup.avatarLink ? (
            <img
              src={selectedGroup.avatarLink}
              alt="Group Avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-colors cursor-pointer"
            />
          ) : (
            <AvatarCl
              username={selectedGroup?.name}
              userId={selectedGroup._id}
              isOnline={null}
              avatarLink={selectedGroup?.avatarLink}
            />
          )}
          <div className="flex flex-col justify-center">
            <span className="font-medium">{selectedGroup.name}</span>
            <span className="text-xs text-cyan-400">Group Chat</span>

            <div className='flex flex-grow gap-2 mt-1'>
              {
                selectedGroup.members.map((memberId, idx) => {
                  let user;
                  let isOnline = false;
                  if (memberId === userDetails?._id) {
                    user = userDetails;
                    isOnline = true;
                  } else {
                    user = onlinePeople[memberId] || offlinePeople[memberId];
                    isOnline = !!onlinePeople[memberId];
                    console.log("Users for group tab bar", user);
                  }
                  if (!user) return null; // skip if user not found
                  // Get first name (split by space)
                  const firstName = user.username?.split(' ')[0] || user.firstName?.split(' ')[0] || 'User';
                  const colorCode = isOnline ? 'text-green-500' : 'text-gray-400';
                  // Build display name
                  const displayName = memberId === userDetails?._id ? `${firstName} (You)` : firstName;

                  return (
                    <React.Fragment key={memberId}>
                      <span className={`text-xs font-semibold ${colorCode}`}>
                        {displayName}
                      </span>
                      {idx < selectedGroup.members.length - 1 &&
                        <span className="text-white/80 text-xs">,</span>
                      }
                    </React.Fragment>
                  );
                })
              }
            </div>
          </div>
        </>
      )}

      {/* Private Chat TopBar */}
      {selectedUserId && !selectedGroupId && (
        <>
          {onlinePeople[selectedUserId] ? (
            <>
              <div onClick={() => handleOpenDialog(onlinePeople[selectedUserId])}>
                {onlinePeople[selectedUserId]?.avatarLink ? (
                  <img
                    src={onlinePeople[selectedUserId].avatarLink}
                    alt="Profile Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-colors"
                  />
                ) : (
                  <AvatarCl
                    username={onlinePeople[selectedUserId].username || selectedUser.username}
                    userId={selectedUserId}
                    isOnline={true}
                    avatarLink={onlinePeople[selectedUserId].avatarLink}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-medium">
                  {onlinePeople[selectedUserId].username}
                </span>
                <span className="text-xs text-green-500">Online</span>
              </div>
            </>
          ) : offlinePeople[selectedUserId] ? (
            <>
              <div onClick={() => handleOpenDialog(offlinePeople[selectedUserId])}>
                {offlinePeople[selectedUserId]?.avatarLink ? (
                  // <div onClick={handleOpenDialog}>
                  <img
                    src={offlinePeople[selectedUserId].avatarLink}
                    alt="Profile Avatar"
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20 hover:border-white/40 transition-colors"
                  />
                  // </div>
                ) : (
                  // <div onClick={handleOpenDialog}>
                  <AvatarCl
                    username={selectedUser.username}
                    userId={selectedUserId}
                    isOnline={false}
                    avatarLink={offlinePeople[selectedUserId].avatarLink}
                  />
                  // </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <span>{offlinePeople[selectedUserId].firstName}</span>
                {lastSeenText ? (
                  <span className="text-[11px] text-gray-400 mb-0">
                    Last seen {lastSeenText}
                  </span>
                ) : (
                  <span className="text-[11px] text-gray-400 mb-0">
                    Last seen {fallbackSeenText}
                  </span>
                )}
              </div>
            </>
          ) : (
            <span className="text-gray-400 italic">{selectedUser?.username || "Unknown"}</span>
          )}
          {/* User details dialog only for private chat */}
          <UserDetailsDialog
            // user={offlinePeople[selectedUserId]}
            user={userData}
            selectedUser={selectedUser}
            open={openDialog}
            onClose={handleCloseDialog}
          />
        </>
      )}
    </div>
  );
};

export default TopBar