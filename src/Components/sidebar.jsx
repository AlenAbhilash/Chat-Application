import React, { useContext } from 'react';
import Search from './Search';
import { AuthContext } from '../context/Authcontext';

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <div>
        <div className='text-white flex flex-wrap space-x-3'>
          {/* Display user's profile picture */}
          <img
            className="w-11 h-11 rounded-full object-cover"
            src={currentUser?.profilePic || "https://i0.wp.com/digitalhealthskills.com/wp-content/uploads/2022/11/fd35c-no-user-image-icon-27.png?fit=500%2C500&ssl=1"}
            alt="User Avatar"
          />
          <div className='flex space-x-2 flex-wrap'>
            {/* Display user's username */}
            <h1 className='font-bold text-xl mt-1'>{currentUser?.username || 'Guest'}</h1>
            <svg
              className="text-themeColor-500 w-6 h-6 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </div>
        </div>
      </div>
      <Search />
    </div>
  );
}

export default Sidebar;
