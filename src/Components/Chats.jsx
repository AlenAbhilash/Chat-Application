import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../firebase';
import { AuthContext } from '../context/Authcontext';
import { ChatContext } from '../context/ChatContext';

const Chats = () => {
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState({});

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const unsub = onSnapshot(doc(db, "usersChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {});
      });
      return () => {
        unsub();
      };
    }
  }, [currentUser]);

  console.log(chats);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className='overflow-y-auto max-h-[320px] hide-scrollbar'>
    {Object.entries(chats)
      .sort((a, b) => (b[1].date?.toMillis() || 0) - (a[1].date?.toMillis() || 0)) 
      .filter(([key, chat]) => chat.userInfo && chat.userInfo.uid !== currentUser.uid)
      .map(([key, chat]) => (
        <div 
          className='mt-1 flex flex-wrap p-2 transition-all ease-out hover:bg-gray-400 cursor-pointer rounded-xl' 
          key={key} 
          onClick={() => handleSelect(chat.userInfo)}
        >
          <img className="w-11 h-11 rounded-full object-cover" src={chat.userInfo?.profilePic} alt="Rounded avatar" />
          <div>
            <h1 className='text-white font-bold ps-2 text-md'>{chat.userInfo?.username}</h1>
            <p className='ps-2 font-semibold text-white'>{chat.lastMessage?.text}</p>
          </div>
        </div>
      ))
    }
  </div>
  
  );
}

export default Chats;
