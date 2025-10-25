import React, { useEffect, useRef, useState } from "react";
import { isToday, isYesterday, format, parseISO, startOfDay, isSameDay } from 'date-fns';
import rocketChatSvg from '../../assets/rocket-chat-1.svg'; 

const ChatMessages = ({ messages, userDetails, selectedUserId, selectedUser, selectedGroupId,
  groups, onlinePeople, offlinePeople }) => {

  const messagesContainerRef = useRef(null);
  // console.log(messages);
  // This code is implementing auto-scroll to bottom functionality for a chat messages container. 
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (container) {
      // Set the container scrollTop to the scrollHeight with smooth behavior
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, messagesContainerRef]);


  // const filteredMessages = messages.filter(message => {
  //   const isMessageForCurrentChat = (
  //     // Message is from selected user to current user
  //     (message.sender === selectedUserId && message.recipient === userDetails._id) ||
  //     // OR message is from current user to selected user
  //     (message.sender === userDetails._id && message.recipient === selectedUserId)
  //   );

  //   // For debugging
  //   // console.log('Message being checked:', {
  //   //   messageId: message._id,
  //   //   sender: message.sender,
  //   //   recipient: message.recipient,
  //   //   selectedUserId,
  //   //   currentUserId: userDetails._id,
  //   //   isRelevant: isMessageForCurrentChat
  //   // });

  //   return isMessageForCurrentChat;
  // });
  // console.log('Filtered Messages:', filteredMessages);

  const filteredMessages = React.useMemo(() => {
    if (selectedUserId) {
      return messages.filter(message =>
        (message.sender === selectedUserId && message.recipient === userDetails._id) ||
        (message.sender === userDetails._id && message.recipient === selectedUserId)
      );
    } else if (selectedGroupId) {
      return messages.filter(message => message.groupId === selectedGroupId || message.group === selectedGroupId);
    }
    return [];
  }, [messages, selectedUserId, selectedGroupId, userDetails]);

//   const filteredMessages = React.useMemo(() => {
//   if (selectedUserId) {
//     // Filter for private messages only (exclude group messages)
//     return messages.filter(message =>
//       message.type !== 'group' && (
//         (message.sender === selectedUserId && message.recipient === userDetails._id) ||
//         (message.sender === userDetails._id && message.recipient === selectedUserId)
//       )
//     );
//   } else if (selectedGroupId) {
//     // Filter for group messages only for the selected group
//     return messages.filter(message => 
//       message.type === 'group' && 
//       (message.groupId === selectedGroupId || message.group === selectedGroupId)
//     );
//   }
//   return [];
// }, [messages, selectedUserId, selectedGroupId, userDetails]);


  const formatDateDivider = (timestamp) => {
    const date = typeof timestamp === 'string' ? parseISO(timestamp) : timestamp;

    if (isToday(date)) return 'Today';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMMM d, yyyy'); // e.g., June 9, 2025
  };

  const getSenderName = (senderId) => {
    if (senderId === userDetails._id) return "You";
    // Try to get from onlinePeople, offlinePeople, or allPeople
    if (onlinePeople && onlinePeople[senderId]) return onlinePeople[senderId].username;
    if (offlinePeople && offlinePeople[senderId]) {
      const user = offlinePeople[senderId];
      return user.firstName ? `${user.firstName} ${user.lastName}` : user.username;
    }
    // fallback
    return senderId;
  };

  // Only Show Name for Other Users (Optional)
  //   {message.sender !== userDetails._id && (
  //   <div className="text-xs text-gray-300 mt-1">
  //     {getSenderName(message.sender)}
  //   </div>
  // )}

  const formatLongMessage = (text, maxCharsPerLine = 50) => {
    // First, split by existing newlines to preserve user-entered breaks
    const lines = text.split('\n');

    // Process each line
    const formattedLines = lines.map(line => {
      // If line is shorter than max, return as is
      if (line.length <= maxCharsPerLine) {
        return line;
      }

      // Break long lines into chunks
      const words = line.split(' ');
      const chunks = [];
      let currentChunk = '';

      words.forEach(word => {
        // If adding this word would exceed the limit
        if ((currentChunk + ' ' + word).trim().length > maxCharsPerLine) {
          // If the word itself is longer than maxCharsPerLine, break it
          if (word.length > maxCharsPerLine) {
            // Push current chunk if any
            if (currentChunk) {
              chunks.push(currentChunk);
              currentChunk = '';
            }
            // Break the long word
            for (let i = 0; i < word.length; i += maxCharsPerLine) {
              chunks.push(word.slice(i, i + maxCharsPerLine));
            }
          } else {
            // Push current chunk and start new one with this word
            chunks.push(currentChunk);
            currentChunk = word;
          }
        } else {
          // Add word to current chunk
          currentChunk = currentChunk ? currentChunk + ' ' + word : word;
        }
      });

      // Don't forget the last chunk
      if (currentChunk) {
        chunks.push(currentChunk);
      }

      return chunks.join('\n');
    });

    return formattedLines.join('\n');
  };


  return (
    <div
      className="absolute bottom-24 w-full px-7 lg:px-20 left-1/2 transform -translate-x-1/2 
      overflow-auto max-h-[90vh] pt-28 h-full"
      // className="flex-1 overflow-y-auto px-7 lg:px-20 py-4"
      ref={messagesContainerRef}
    >
      {filteredMessages && filteredMessages.length > 0 && (
        <div className="flex flex-col gap-2 pb-4">
          {messages.map((message, index) => {
            const currentDate = startOfDay(parseISO(message.createdAt));
            const previousMessage = messages[index - 1];
            const previousDate = previousMessage
              ? startOfDay(parseISO(previousMessage.createdAt))
              : null;

            const showDateDivider = !previousDate || !isSameDay(currentDate, previousDate);

            return (
              <React.Fragment key={message._id || index}>
                {showDateDivider && (
                  // <div className="flex items-center justify-center my-4">
                  //   <div className="flex-grow border-t border-gray-400/30"></div>
                  <div className="text-center text-white/75 text-sm my-4">
                    {formatDateDivider(message.createdAt)}
                  </div>
                  //   <div className="flex-grow border-t border-gray-400/30"></div>
                  // </div>
                )}
                <div
                  className={`text-white ${
                    // Check both cases: sender as string ID or sender as object
                    (message.sender === userDetails._id || message.sender._id === userDetails._id)
                      ? "bg-primarySecond self-end rounded-l-2xl"  // Your messages
                      : "bg-primary self-start rounded-r-2xl"       // Other's messages
                    } relative group rounded-b-2xl px-5 py-3`}
                >
                  <div>

                    {/* Message Text */}
                    <div
                      style={{ wordWrap: "break-word" }}
                      className="flex flex-wrap max-w-[500px] overflow-auto text-white font-normal"
                    >
                      {/* {message.text} */}
                      {formatLongMessage(message.text, 10)}
                    </div>

                    {/* Time */}
                    <div
                      className={`text-xs mt-2 font-medium ${message.sender !== userDetails._id
                        ? "text-left text-white/85"
                        : "text-right text-white/85"
                        }`}
                    >
                      {/* Show sender name for group messages (except your own) */}
                      {selectedGroupId &&
                        !(message.sender === userDetails._id || message.sender._id === userDetails._id) &&  (
                          <>
                            {(() => {
                              const senderId = message.sender._id || message.sender;
                              const senderInfo = onlinePeople[senderId] || offlinePeople[senderId];

                              // console.log('Sender lookup:', {
                              //     senderId,
                              //     senderInfo,
                              //     onlinePeople: Object.keys(onlinePeople),
                              //     offlinePeople: Object.keys(offlinePeople)
                              // });

                              if (senderInfo) {
                                const firstName = senderInfo.username?.split(' ')[0] ||
                                  senderInfo.firstName?.split(' ')[0] ||
                                  'Unknown';
                                return firstName;
                              }
                              return 'Unknown';
                            })()}
                            {' • '}
                          </>
                      )}
                      {format(parseISO(message.createdAt), 'h:mm a')} {/* e.g., 2:15 PM */}
                    </div>
                  </div>

                  {/* Tail of the speech bubble */}
                  <div
                    className={`absolute top-0 w-0 h-0 ${(message.sender === userDetails._id || message.sender._id === userDetails._id)
                      ? " -right-4 border-l-primarySecond border-l-[20px]"
                      : "border-r-primary -left-4 border-r-[20px]"
                      } border-b-[20px] border-b-transparent`}
                  ></div>
                </div>
              </React.Fragment>
            );
          })}
        </div>)
      }


      {!selectedUserId && !selectedGroupId && (
        <div className="text-gray-500 flex flex-col items-center justify-center h-full  border-gray-700">
          <div className="flex items-center justify-center mt-4">
            <img
              // src="/src/assets/rocket-chat-1.svg"
              src={rocketChatSvg}
              alt="chat"
              className="w-100 h-40 object-contain mix-blend-screen"
            />
          </div>


          <div className="text-center  mt-4">
            <h2 className="text-lg font-semibold">Select a chat or group to view messages and start a conversation</h2>
            <p className="text-sm text-gray-400 hidden">
              Click on a contact or group to view messages and start a conversation.
            </p>
          </div>
        </div>
      )}

      {/* Show "Start a conversation" if chat is selected but no messages */}
      {(selectedUserId || selectedGroupId) && filteredMessages.length === 0 && (
        <div className="text-gray-500 flex items-end justify-center h-full">
          Start a conversation
        </div>
      )}

      {/* {selectedUserId && !messages.length && (
        <div className="text-gray-500   flex items-end justify-center h-full ">
          Start a conversation
        </div>
      )} */}
    </div>
  );
};

export default ChatMessages;