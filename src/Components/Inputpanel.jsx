import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/Authcontext';
import { ChatContext } from '../context/ChatContext';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

const InputPanel = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (text.trim() === "" && !image) return;

    let imageUrl = "";
    if (image) {
      try {
        const picRef = ref(storage, `images/${uuid()}`); // Create a path for the image in storage
        await uploadBytes(picRef, image);
        imageUrl = await getDownloadURL(picRef);
      } catch (error) {
        console.error("Error uploading image:", error);
        return; // Exit if image upload fails
      }
    }

    try {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text: text.trim(),
          image: imageUrl,
          senderID: currentUser.uid,
          date: Timestamp.now()
        })
      });

      await updateDoc(doc(db, "usersChats", currentUser.uid), {
        [`${data.chatId}.lastMessage`]: {
          text: text.trim(),
          image: imageUrl
        },
        [`${data.chatId}.date`]: serverTimestamp()
      });

      await updateDoc(doc(db, "usersChats", data.user.uid), {
        [`${data.chatId}.lastMessage`]: {
          text: text.trim(),
          image: imageUrl
        },
        [`${data.chatId}.date`]: serverTimestamp()
      });

      setText("");
      setImage(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className='relative mt-3 flex items-center'>
      <input
        type="text"
        className="bg-white/60 border border-gray-300 text-gray-900 text-[15px] rounded-lg
         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-12 dark:placeholder-gray-400
          dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Type Something....."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <label htmlFor="image-upload" className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
        <svg
          className="h-6 w-6 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      <svg
        className="absolute left-[68%] md:left-[75%] top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500 hidden md:block"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>

      <button
        type="button"
        className="absolute left-[76%] md:left-[82%] top-1/2 transform -translate-y-1/2 h-8 w-20 items-center rounded-full  
                bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px]
                 text-white"
        onClick={handleSend}
      >
        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
          <svg
            className="h-6 w-6 text-gray-100"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />
            <line x1="10" y1="14" x2="21" y2="3" />
            <path d="M21 3L14.5 21a.55 .55 0 0 1 -1 0L10 14L3 10.5a.55 .55 0 0 1 0 -1L21 3" />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default InputPanel;
