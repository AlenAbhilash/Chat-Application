import React, { useContext, useEffect, useState } from 'react';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        if (data.chatId) {
            const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
                if (doc.exists()) {
                    setMessages(doc.data().messages || []);
                }
            });
            
            return () => {
                unSub();
            };
        }
    }, [data.chatId]);

    console.log(messages);

    return (
        <div className='bg-white/40  p-5 mt-4 rounded-2xl text-gray-700 h-[370px] overflow-y-scroll hide-scrollbar'>
            {messages.length > 0 ? (
                messages.map((message) => (
                    <Message message={message} key={message.id} />
                ))
            ) : (
                <p className='text-center text-gray-500'>No messages</p>
            )}
        </div>
    );
}

export default Messages;
