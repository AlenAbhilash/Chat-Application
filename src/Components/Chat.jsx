import React, { useContext } from 'react';
import Messages from './Messages';
import Inputpanel from './Inputpanel';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div>
      <div className='bg-white/55 p-5 rounded-xl flex flex-wrap space-x-56'>
        <div className='flex flex-wrap space-x-3'>
          <img
            className="w-9 h-9 rounded-full object-cover"
            src={data.user?.profilePic || "https://pbs.twimg.com/profile_images/1321030814436655106/87OcbZNm_400x400.jpg"}
            alt="Rounded avatar"
          />
          <h1 className='text-gray-600 font-semibold mt-1 text-md cursor-pointer'>{data.user?.username ? data.user?.username : "Start A Conversation"}</h1>
        </div>
        <div className='flex space-x-4'>
          <svg
            className="h-6 w-6 text-gray-500 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="23 7 16 12 23 17 23 7" />
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
          </svg>
          <svg
            className="h-6 w-6 text-gray-500 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="8.5" cy="7" r="4" />
            <line x1="20" y1="8" x2="20" y2="14" />
            <line x1="23" y1="11" x2="17" y2="11" />
          </svg>
          <svg
            className="h-6 w-6 text-gray-500 cursor-pointer"
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
            <circle cx="5" cy="12" r="1" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
          </svg>
        </div>
      </div>
      <Messages />
      <Inputpanel />
    </div>
  );
}

export default Chat;
