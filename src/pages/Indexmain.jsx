import React from 'react';
import { useNavigate } from 'react-router-dom';

const Indexmain = () => {
    const nav = useNavigate()
    function Registertationpage() {
        nav('regsiter')
    }
    function loginpage() {
        nav('login')
    }
    return (
        <>
            {/* Navbar */}
            <nav className="w-full flex flex-wrap justify-start md:justify-end p-[10px] ps-[70px]">
                <button type="button" className="h-10 w-32 m-[10px] items-center rounded-full 
          bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px]
           text-white">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900" onClick={loginpage}>Login</div>
                </button>
                <button type="button" className="h-10 w-32 m-[10px] items-center rounded-full 
          bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px]
           text-white">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900" onClick={Registertationpage}>Register</div>
                </button>
            </nav>
            {/* Navbar ends */}

            {/* Main head */}
            <h1 className="font-sans text-transparent bg-clip-text bg-white font-bold text-2xl w-auto text-center 
          to-slate-700 md:text-5xl m-[50px] md:mt-[35px] md:w-[565px] h-auto md:ms-[500px]">
                Discover Online Chat Application
            </h1>
            {/* Main head ends */}

            {/* Background color */}
            <div className="circlePosition bg-gradient-to-r from-blue-500 to-red-500
           w-[60%] h-[400px] rounded-[100%] blur-[100px] relative left-[24%] top-[30%]">
            </div>
            {/* Background color ends */}

            {/* Image section */}
            <div className="absolute top-[20%] w-auto h-auto flex flex-wrap md:top-[25%] blurtext mt-[50px]
           bg-[white]/40 z-10 md:left-[26%] md:w-6/12 md:h-[auto] md:ps-[100px] p-10 rounded-3xl">
                <div className="flex-col flex-wrap space-y-10 ps-[70px] justify-center items-center
         md:flex md:flex-wrap md:flex-row md:space-x-10 md:space-y-0 md:ps-0">
                    <img className="w-[150px] h-[150px] object-cover rounded-3xl border-transparent transition-all ease-in-out hover:w-[200px] 
          hover:cursor-pointer"
                        src="https://images.pexels.com/photos/5965771/pexels-photo-5965771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Image 1" />
                    <img className="w-[150px] h-[150px] object-cover rounded-3xl border-transparent transition-all ease-in-out hover:w-[200px] 
          hover:cursor-pointer"
                        src="https://images.pexels.com/photos/1267697/pexels-photo-1267697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Image 2" />
                    <img className="w-[150px] h-[150px] object-cover rounded-3xl border-transparent transition-all ease-in-out hover:w-[200px] 
          hover:cursor-pointer"
                        src="https://images.pexels.com/photos/4049988/pexels-photo-4049988.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Image 3" />
                </div>
                {/* Image section ends */}

                {/* Description */}
                <div className="p-4 w-auto h-auto items-center m-0 space-y-5">
                    <p className="text-slate-300 font-semibold">
                        Experience the future of communication with our online chat application, which offers seamless, 24/7 access to your
                        conversations from anywhere. Enjoy the convenience of staying connected with friends, family, or colleagues without needing
                        to be in the same place. Our platform makes it easy to chat in real-time, share files, and stay updated on conversations with just a few clicks.
                        Whether you're at home, at work, or on the go, our chat application ensures you remain in the loop effortlessly.
                    </p>
                    <button type="button" className="h-10 w-32 m-[10px] items-center rounded-full 
          bg-gradient-to-r from-purple-500 via-red-500 to-yellow-500 p-[1.5px]
           text-white md:ms-[200px]">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-900">
                            Let’s Start &rarr;
                        </div>
                    </button>
                </div>
                {/* Description ends */}
            </div>
        </>
    );
};
export default Indexmain;
