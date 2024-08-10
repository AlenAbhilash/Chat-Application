import React, { useState } from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState({ type: '', message: '' });
    const [showToast, setShowToast] = useState(false);
    const nav = useNavigate()

    const handleLogin = async () => {
        if (!email || !password) {
            setToast({ type: 'error', message: 'Please fill in all fields.' });
            setShowToast(true);
            console.log('Error: Please fill in all fields.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setToast({ type: 'success', message: 'Logged in successfully!' });
            setShowToast(true);
            console.log('Login successful');
            nav('/home')
            setEmail("");
            setPassword("");
        } catch (err) {
            if (err.code === 'auth/wrong-password') {
                setToast({ type: 'error', message: 'Incorrect password.' });
            } else if (err.code === 'auth/user-not-found') {
                setToast({ type: 'error', message: 'User not found.' });
            } else {
                setToast({ type: 'error', message: `Error: Enter The Correct Data` });
            }
            setEmail("");
            setPassword("");
            setShowToast(true);
            console.log(`Error: ${err.message}`);
        }
    };
    function Registerpage() {
        nav('/regsiter')
    }

    return (
        <div className="bg-black">
            {/* Main Head */}
            <div className='flex'>
                <h1 className="font-sans text-transparent bg-clip-text bg-white font-bold text-2xl w-auto text-center to-slate-700 md:text-5xl m-[50px] md:mt-[80px] md:w-[565px] h-auto md:ms-[500px]">
                    Login Your Account
                </h1>
                <div className='md:mt-16 md:ms-10'>
                    {/* Toast Notifications */}
                    {showToast && (
                        <Toast
                            type={toast.type === 'success' ? 'success' : 'error'}
                            onDismiss={() => setShowToast(false)}
                        >
                            <div className={`inline-flex md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg ${toast.type === 'success' ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200' : 'bg-red-200 text-red-500 dark:bg-red-500 dark:text-red-300'}`}>
                                {toast.type === 'success' ? (
                                    <HiCheck className="h-5 w-5" />
                                ) : (
                                    <HiExclamation className="h-5 w-5" />
                                )}
                            </div>
                            <div className="ml-3 text-sm font-normal">{toast.message}</div>
                            <button onClick={() => setShowToast(false)} className="h-5 w-5 m-2 ms-4">
                                <HiX />
                            </button>
                        </Toast>
                    )}
                </div>
            </div>
            {/* Background Color */}
            <div className="circlePosition bg-gradient-to-r from-blue-500 to-red-500 w-[60%] h-[500px] rounded-[100%] blur-[90px] relative left-[24%] top-[40%]"></div>
            {/* Main Transparent */}
            <div className="md:flex md:flex-wrap md:space-x-10 absolute top-[10%] left-[15%] space-y-5 w-auto h-auto md:top-[20%] blurtext mt-[50px] bg-[white]/40 z-10 md:left-[27%] md:w-auto md:h-[auto] md:ps-[100px] p-10 rounded-3xl">
                <div className="w-auto h-auto flex flex-wrap flex-col space-y-4">
                    <label htmlFor="username" className="text-2xl text-slate-200 font-semibold">
                        Enter Email
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <label htmlFor="passWord" className="text-2xl text-slate-200 font-semibold">
                        Enter Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="passWord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <button
                        type="button"
                        className="h-10 w-32 m-[10px] items-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px] text-white"
                        onClick={handleLogin}
                    >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                            Login &rarr;
                        </div>
                    </button>
                    <br />
                    <h1 className="ps-2 w-[200px] text-white font-semibold underline cursor-pointer" onClick={Registerpage}>
                        Create A New Account
                    </h1>
                </div>
                <div>
                    <img
                        src="https://media.istockphoto.com/id/1357572859/photo/a-couple-relaxing-in-the-living-room-while-watching-something-on-the-smartphone.jpg?s=612x612&w=0&k=20&c=_xqdwYvGHX8oMJs2nURcKRZ-uDCg9vyD8CiSu5jlDE8="
                        alt="Mobile phone use"
                        className="md:w-[300px] md:h-[300px] object-cover w-[200px] h-[200px] rounded-3xl transition-all ease-in-out hover:w-[360px]"
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
