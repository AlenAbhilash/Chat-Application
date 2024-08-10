import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/'); 
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <div>
            <div className='mt-6'>
                <button 
                    type="button" 
                    className="h-10 w-32 m-[10px] items-center rounded-full 
                    bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px]
                     text-white" 
                    onClick={handleSignOut}
                >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                        Log Out
                    </div>
                </button>
            </div>
        </div>
    );
}

export default LogOut;
