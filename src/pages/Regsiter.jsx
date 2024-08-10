import React, { useState } from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [pic, setPic] = useState(null);
    const [toast, setToast] = useState({ type: '', message: '' });
    const [showToast, setShowToast] = useState(false);
    const nav = useNavigate()

    const handleSubmit = async () => {
        if (!username || !email || !password) {
            setToast({ type: 'error', message: 'Please fill in all fields.' });
            setShowToast(true);
            return;
        }
        if (password.length < 6) {
            setToast({ type: 'error', message: 'Password must be at least 6 characters long.' });
            setShowToast(true);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            let picUrl = '';
            if (pic) {
                const picRef = ref(storage, `profilePics/${user.uid}`);
                await uploadBytes(picRef, pic);
                picUrl = await getDownloadURL(picRef);
            }
            await setDoc(doc(db, 'users', user.uid), {
                uid: user.uid,
                username: username,
                email: email,
                password: password,
                profilePic: picUrl
            });
            await setDoc(doc(db, 'usersChats', user.uid), {
            });
            setToast({ type: 'success', message: 'Data saved successfully' });
            setUsername("");
            setEmail("");
            setPassword("");
            setPic(null);
            nav('/login')
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setToast({ type: 'error', message: 'Email is already in use.' });
            } else {
                setToast({ type: 'error', message: `Error: ${err.message}` });
            }
        }
        setShowToast(true);
    };

    return (
        <div className="bg-black">
            {/* main head */}
            <div className='flex'>
                <h1 className=" w-auto h-auto font-sans mt-5 text-transparent bg-clip-text bg-white font-bold text-lg text-center to-slate-700 md:text-5xl m-[50px] md:mt-[80px] md:w-[565px] md:h-[80px]  md:ms-[500px]">
                    Register Your Account
                </h1>
                <div className=' mt-2  md:mt-16 md:ms-10'>
                    {/* Toast notifications */}
                    {showToast && (
                        <Toast
                            type={toast.type === 'success' ? 'success' : 'error'}
                        >
                            <div className={` mt-2 w-5 h-5 inline-flex md:h-8 md:w-8 shrink-0 items-center justify-center rounded-lg ${toast.type === 'success' ? 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200' : 'bg-red-200 text-red-500 dark:bg-red-500 dark:text-red-300'}`}>
                                {toast.type === 'success' ? (
                                    <HiCheck className="w-3 h-3  md:h-5 md:w-5   " />
                                ) : (
                                    <HiExclamation className="w-3 h-3 md:h-5 md:w-5" />
                                )}
                            </div>
                            <div className="ml-3 text-sm font-normal">{toast.message}</div>
                            <button onClick={() => setShowToast(false)} className="h-3 w-3  md:h-5 md:w-5 md:m-2 ms-4">
                                <HiX />
                            </button>
                        </Toast>
                    )}

                </div>
            </div>
            {/* background color */}
            <div className="circlePosition bg-gradient-to-r from-blue-500 to-red-500 w-[60%] h-[500px] rounded-[100%] blur-[90px] relative left-[24%] top-[40%]"></div>
            {/* main transparent */}
            <div className="md:flex md:flex-wrap md:space-x-10 absolute top-[8%] left-[5%] space-y-5 w-auto h-auto md:top-[15%] blurtext mt-[50px] bg-[white]/40 z-10 md:left-[27%] md:w-auto md:h-[auto] md:ps-[100px] p-10 rounded-3xl">
                <div className="w-auto h-auto flex flex-wrap flex-col space-y-4">
                    <label htmlFor="username" className="text-2xl text-slate-200 font-semibold">Enter User Name</label>
                    <input
                        type="text"
                        name="name"
                        id="username"
                        value={username}  // Bind the value to state
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="accountnumber" className="text-2xl text-slate-200 font-semibold">Enter Email</label>
                    <input
                        type="email"
                        name="account"
                        id="accountnumber"
                        value={email}  // Bind the value to state
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="password" className="text-2xl text-slate-200 font-semibold">Enter Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}  // Bind the value to state
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />

                    <label htmlFor="pic" className="text-2xl text-slate-200 font-semibold">Upload User Avatar</label>
                    <input
                        className="p-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
                        id="pic"
                        type="file"
                        onChange={(e) => setPic(e.target.files[0])}
                    />

                    <button
                        type="button"
                        className="h-10 w-32 m-[10px] items-center rounded-full bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px] text-white"
                        onClick={handleSubmit}
                    >
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                            <i className="fas fa-paper-plane icon"></i> Submit
                        </div>
                    </button>
                </div>
                <div>
                    <img
                        src="https://media.istockphoto.com/id/1792264378/photo/a-young-east-asian-female-adult-looking-and-using-her-mobile-phone.webp?b=1&s=170667a&w=0&k=20&c=9AVItcQtRy00YYtt7oW1-tAIl1UKsaQhZFvZktLMPDw="
                        alt="Mobile phone use"
                        className="md:w-[300px] md:h-[300px] object-cover w-[200px] h-[200px] rounded-3xl transition-all ease-in-out hover:w-[360px]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
