import React from 'react';
import Sidebar from '../Components/Sidebar';
import Chat from '../Components/Chat';
const HomeMain = () => {
    return (
        <div className="bg-black flex"> 
            {/* mainhead */} 
            {/* mainheadends */}
            {/* backgroundcolor */}
            <div className="circlePosition bg-gradient-to-r from-blue-500 to-red-500 w-[70%] h-[600px] rounded-[100%] blur-[90px] absolute left-[20%] top-[12%]"></div>
            {/* backgroundcolorends */}
            <div class=" bg-[white]/40 z-10 w-auto h-auto p-[25px] rounded-2xl absolute   md:left-[25%]  md:top-[10%] ">
                <div class="w-auto h-auto flex flex-wrap flex-row space-y-4  md:space-y-0 md:space-x-20">
                  <Sidebar />
                    <Chat />
                </div>
            </div>
        </div>
    );
}
export default HomeMain;
