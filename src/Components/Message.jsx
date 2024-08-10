import React, { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../context/Authcontext';
import { ChatContext } from '../context/ChatContext';

function Message({ message }) {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const [imageDimensions, setImageDimensions] = useState({ width: null, height: null });

  if (!message) {
    return null;
  }

  // Handle cases where currentUser or data might be null or undefined
  if (!currentUser || !data || !data.user) {
    return null;
  }

  const isCurrentUser = message.senderID === currentUser.uid;

  const handleImageLoad = (e) => {
    const { width, height } = e.target;
    setImageDimensions({ width, height });
  };

  const imageStyle = imageDimensions.width > 300 || imageDimensions.height > 300 ?
    { maxWidth: '300px', maxHeight: '300px' } : {};

  const formatTime = (timestamp) => {
    if (!timestamp) return "Just Now";
    const date = timestamp.toDate();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div ref={ref} className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} my-5`}>
      {!isCurrentUser && (
        <div className='flex flex-wrap space-x-3'>
          <div>
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={data.user.profilePic}
              alt="Profile Pic"
            />
            <h1 className='text-[12px]'>{formatTime(message.date)}</h1>
          </div>
          <div className='flex flex-wrap flex-col space-y-3'>
            <div>
              <h1 className='w-auto bg-white inline-block p-2 rounded-xl font-semibold text-sm'>
                {message.text || "No message"}
              </h1>
            </div>
            {message.image && (
              <img
                className='rounded-xl'
                src={message.image}
                alt="Attachment"
                style={imageStyle}
                onLoad={handleImageLoad}
              />
            )}
          </div>
        </div>
      )}

      {isCurrentUser && (
        <div className='flex flex-wrap space-x-3'>
          <div className='flex flex-col flex-wrap space-y-3'>
            <div>
              <h1 className='w-auto bg-slate-300 inline-block p-2 rounded-xl font-semibold text-sm text-black'>
                {message.text || "No message"}
              </h1>
            </div>
            {message.image && (
              <img
                className='rounded-xl'
                src={message.image}
                alt="Attachment"
                style={imageStyle}
                onLoad={handleImageLoad}
              />
            )}
          </div>
          <div>
            <img
              className="w-9 h-9 rounded-full object-cover"
              src={currentUser.profilePic}
              alt="Profile Pic"
            />
            <h1 className='text-[12px]'>{formatTime(message.date)}</h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Message;
