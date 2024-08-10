import React, { useState, useContext } from 'react';
import Chats from './Chats';
import LogOut from './LogOut';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../context/Authcontext';

const Search = () => {
  const { currentUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    if (username.trim() === '') {
      setErr(true);
      setUser(null);
      return;
    }

    const q = query(collection(db, "users"), where("username", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No matching user found");
        setUser(null);
      } else {
        let foundUser = null;
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid !== currentUser.uid) {
            foundUser = userData;
            console.log("User found:", foundUser);
          }
        });
        setUser(foundUser);
      }
    } catch (error) {
      console.error("Error searching for user:", error);
      setErr(true);
      setUser(null);
    }
  };

  const handleKey = (e) => {
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (!user) {
      console.log("No user selected for chat creation.");
      return;
    }

    // Compute a unique combined ID for the chat
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    // Create a reference to the chat document
    const chatDocRef = doc(db, "chats", combinedId);

    try {
      // Check if the chat document exists
      const response = await getDoc(chatDocRef);
      if (!response.exists()) {
        // Create a new chat document with an empty messages array if it doesn't exist
        await setDoc(chatDocRef, { messages: [] });

        // Create references for userChats for both users
        const userChatsRefCurrentUser = doc(db, "usersChats", currentUser.uid);
        const userChatsRefOtherUser = doc(db, "usersChats", user.uid);

        // Update the userChats document for the current user
        await updateDoc(userChatsRefCurrentUser, {
          [`${combinedId}.userInfo`]: {
            uid: user.uid,
            username: user.username,
            profilePic: user.profilePic
          },
          [`${combinedId}.data`]: serverTimestamp()
        });

        // Update the userChats document for the other user
        await updateDoc(userChatsRefOtherUser, {
          [`${combinedId}.userInfo`]: {
            uid: currentUser.uid,
            username: currentUser.username,
            profilePic: currentUser.profilePic
          },
          [`${combinedId}.data`]: serverTimestamp()
        });

        console.log("Chat created and updated for both users.");
      } else {
        console.log("Chat already exists.");
      }
    } catch (error) {
      console.error("Error handling chat selection:", error);
    }
    setUser(null)
    setUsername("")
  };

  return (
    <div>
      <div className='p-3'>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Find User"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          onKeyDown={handleKey}
        />
        {err && <p className="text-red-500">Error occurred. Please try again.</p>}
      </div>
      <div className='p-1 mt-2 rounded-2xl text-gray-700 h-auto overflow-y-scroll hide-scrollbar'>
        {user ? (
          <div
            className='mt-1 flex flex-wrap p-2 transition-all ease-out hover:bg-gray-300 cursor-pointer rounded-xl'
            onClick={handleSelect}
          >
            <img
              className="w-11 h-11 rounded-full object-cover"
              src={user.profilePic || "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?cs=srgb&dl=pexels-stefanstefancik-91227.jpg&fm=jpg"}
              alt="User avatar"
            />
            <div>
              <h1 className='text-white font-bold ps-2 text-md'>{user.username}</h1>
            </div>
          </div>
        ) : (
          <p className='text-gray-500'>{username.trim() === '' ? '' : 'No users found'}</p>
        )}
      </div>
      <div>
        <Chats />
        <LogOut />
      </div>
    </div>
  );
}

export default Search;
