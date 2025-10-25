import { useContext, useMemo } from "react";
import { Card, CardContent, CardHeader, Typography, } from "@mui/material";
import { Avatar, } from "@mui/material"
import { Badge } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { UserPresenceProvider } from "../../context/UserPresenceContext";
import { useUserPresence } from "../../context/UserPresenceContext";
import { useProfile } from "../../context/profileContext";

const recentChatsData = [
  {
    id: 1,
    name: "Jane Doe",
    lastMessage: "Thanks for the quick response! Looking forward to our next chat.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: "online",
    unreadCount: 0,
  },
  {
    id: 2,
    name: "John Smith",
    lastMessage: "Hey! Can we schedule a call for tomorrow?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    status: "away",
    unreadCount: 2,
  },
  {
    id: 3,
    name: "Sarah Wilson",
    lastMessage: "Perfect! I'll send you the files by end of day.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
    status: "offline",
    unreadCount: 0,
  },
  {
    id: 4,
    name: "Mike Johnson",
    lastMessage: "Could you review the latest design mockups?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    status: "online",
    unreadCount: 1,
  },
  {
    id: 5,
    name: "Emily Davis",
    lastMessage: "Great meeting today! Let's follow up next week.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    status: "away",
    unreadCount: 0,
  },
];

export function RecentChats() {
  // const { userDetails } = useContext(UserPresenceProvider);
  const { onlinePeople, offlinePeople, allUsers } = useUserPresence();
  const { userDetails } = useProfile();

  console.log("User Details:", userDetails);
  
  console.log("Online People:", onlinePeople);
  console.log("All Users:", allUsers);
  console.log("Offline People:", offlinePeople);

  // Convert the presence data to chat format
  // const recentChatsData = useMemo(() => {
  //   return Object.entries(allUsers)
    
  //   .map(([userId, userData]) => ({
  //     id: userId,
  //     name: userData.firstName || `User ${userId}`,
  //     status: onlinePeople[userId] ? 'online' : 'offline',
  //     lastMessage: userData.lastMessage || 'No recent messages',
  //     timestamp: userData.lastSeen || new Date(),
  //     unreadCount: userData.unreadCount || 0
  //   }));
  // }, [allUsers, onlinePeople]);

  const recentChatsData = useMemo(() => {
        return Object.entries(allUsers)
            .filter(([userId]) => userId !== userDetails?._id) // Filter out current user
            .map(([userId, userData]) => ({
                id: userId,
                name: userData.firstName || `User ${userId}`,
                status: onlinePeople[userId] ? 'online' : 'offline',
                lastMessage: userData.lastMessage || 'No recent messages',
                timestamp: userData.lastSeen || new Date(),
                unreadCount: userData.unreadCount || 0
            }));
    }, [allUsers, onlinePeople, userDetails]);

  // return (
  //   <Card className="bg-white/80 backdrop-blur-sm border-white/20">
  //     {/* <CardContent> */}
  //     {/* <Typography variant="body2" sx={{ fontWeight: 600, ml: 4, fontSize:19 }}>Recent Conversations</Typography> */}
  //     <h2 className="text-lg ml-4 font-semibold">Recent Conversations</h2>
  //     <p className="text-sm ml-4  text-gray-500"> Your latest chat activity </p>
  //     {/* <Typography variant="body2" sx={{ fontWeight: 100, ml: 4, fontSize:14 }}>Your latest chat activity</Typography> */}
  //     {/* </CardContent> */}
  //     <CardContent>
  //       <div className="space-y-4">
  //         {recentChatsData.map((chat) => (
  //           <div
  //             key={chat.id}
  //             className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50/50 transition-colors cursor-pointer"
  //           >
  //             <div className="relative">
  //               {/* <Avatar className="h-10 w-10">
  //                 <AvatarFallback className="bg-gradient-chat text-white text-sm">
  //                   {chat.name.split(' ').map(n => n[0]).join('')}
  //                 </AvatarFallback>
  //               </Avatar> */}
  //               <Avatar
  //                 className="h-10 w-10"
  //                 sx={{
  //                   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  //                   width: 40,
  //                   height: 40
  //                 }}
  //               >
  //                 {chat.name.split(' ').map(n => n[0]).join('')}
  //               </Avatar>
  //               <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${chat.status === 'online' ? 'bg-green-500' :
  //                   chat.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
  //                 }`} />
  //             </div>

  //             <div className="flex-1 min-w-0">
  //               <div className="flex items-center justify-between">
  //                 <p className="text-sm font-medium text-gray-900 truncate">
  //                   {chat.name}
  //                 </p>
  //                 <div className="flex items-center space-x-2">
  //                   {chat.unreadCount > 0 && (
  //                     <Badge variant="secondary" className="bg-purple-100 text-purple-700 ">
  //                       {chat.unreadCount}
  //                     </Badge>
  //                   )}
  //                   <p className="text-xs text-gray-500">
  //                     {formatDistanceToNow(chat.timestamp, { addSuffix: true })}
  //                   </p>
  //                 </div>
  //               </div>
  //               <p className="text-sm text-gray-500 truncate mt-1">
  //                 {chat.lastMessage}
  //               </p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </CardContent>
  //   </Card>
  // );

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20">
      <h2 className="text-lg ml-4 font-semibold">Recent Conversations</h2>
      <p className="text-sm ml-4 text-gray-500">Your latest chat activity</p>

      <CardContent>
        <div className="space-y-4">
          {recentChatsData.length > 0 ? (
            recentChatsData.map((chat, index) => (
              <div
                key={chat.id}
                // className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50/50 transition-colors cursor-pointer"
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50/50 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:shadow-md animate-message-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <Avatar
                    className="h-10 w-10"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      width: 40,
                      height: 40
                    }}
                  >
                    {chat.name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${chat.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                    }`} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {chat.name}
                    </p>
                    <div className="flex items-center space-x-2">
                      {chat.unreadCount > 0 && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {chat.unreadCount}
                        </Badge>
                      )}
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(chat.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">No recent conversations</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

}