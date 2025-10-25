import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react'
// import data from '@emoji-mart/data/sets/14/native.json'
// import { Picker } from 'emoji-mart'
import { Sticker } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';

const MessageInputForm = ({
  selectedUserId,
  selectedGroupId,
  newMessage,
  setNewMessage,
  sendMessage,

}) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const WORDS_PER_LINE = 10;

  const handleEmojiSelect = (emoji) => {
    console.log('Selected emoji:', emoji);

    setNewMessage(prev => prev + emoji.emoji)
    setShowEmojiPicker(false)
  }
  // const handleEmojiSelect = (emojiData, event) => {
  //   setNewMessage(prevMessage => prevMessage + emojiData.emoji)
  //   setShowEmojiPicker(false)
  // }
  if (!selectedUserId && !selectedGroupId) return null;

  const handleChange = (ev) => {
    let value = ev.target.value;

    // // Split the value into words
    // const words = value.split(/\s+/);

    // // Reconstruct the value with newlines after every WORDS_PER_LINE words
    // let newValue = '';
    // for (let i = 0; i < words.length; i++) {
    //   newValue += words[i];
    //   if ((i + 1) % WORDS_PER_LINE === 0 && i !== words.length - 1) {
    //     newValue += '\n';
    //   } else if (i !== words.length - 1) {
    //     newValue += ' ';
    //   }
    // }

    setNewMessage(value);
  };

  return (
    <>
      {/* {!!selectedUserId && !!selectedGroupId && ( */}
      <form onSubmit={sendMessage} className="relative  m-4 w-[85%] border-t border-gray-500 pt-1.5 flex items-center">
        <input
          type="search"
          id="search-dropdown"
          className="w-full px-4 py-3 rounded-xl bg-transparent outline-none text-white "
          placeholder="Your Message"
          value={newMessage}
          // onChange={(ev) => setNewMessage(ev.target.value)}
          onChange={handleChange}
          required
          autoComplete="off"
          style={{
            minHeight: '48px',
            maxHeight: '120px',
            overflowY: 'auto',
            width: "90%"
          }}
        />

        {/* <div className="absolute right-12">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="aspect-square h-10 text-white rounded-lg hover:bg-gray-700/50"
            >
              <Sticker h={8} w={8} />
            </button>

            {showEmojiPicker && (
              <div className="absolute bottom-12 right-0">
                <EmojiPicker
                  // data={data}
                  onEmojiSelect={handleEmojiSelect}
                  theme="dark"
                  previewPosition="none"
                />
              </div>
            )}
          </div> */}

        <div className="absolute right-12">
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="aspect-square h-10 text-white rounded-lg p-2 hover:bg-gray-700/50"
          >
            <Sticker h={8} w={8} />
          </button>

          {showEmojiPicker && (
            <div className="absolute bottom-12 right-0 z-50">
              <EmojiPicker
                onEmojiClick={handleEmojiSelect}
                theme="dark"
                searchDisabled
                skinTonesDisabled
                width={400}
                height={400}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="absolute end-0 aspect-square h-10 font-medium text-white bg-cyan rounded-e-lg p-2 hover:bg-cyan-700/50"
          disabled={
            !newMessage.trim() 
            // || !/^[\w\d\s.,!?@#$%^&*()_\-+=:;'"<>/\\|[```{}~`]+$/u.test(newMessage.trim())
          }
        >
          <SendHorizontal className="w-6 h-6" />
        </button>
      </form>
      {/* )} */}
    </>
  );
};

export default MessageInputForm;