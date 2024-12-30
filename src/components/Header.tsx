import { useState } from "react";
import { MoonIcon,SunIcon } from "@heroicons/react/16/solid";

const Header = () => {

 const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };
    return(
    <div className=" flex justify-between w-[90%]">
      <h1 className="text-3xl text-[#B0B0B0]  font-bold mb-4 animate-fadeIn">Typing Speed Test</h1>

      <button
          onClick={toggleDarkMode}
          className="  px-4 py-1 rounded-full
          hover:bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6]
          hover:dark:from-[#1E1E1E] dark:via-[#2E2E2E] dark:to-[#3E3E3E]
          hover:shadow-inner
         "
        >
           {darkMode ? (
        <SunIcon className="h-6 w-6 text-[#fff]" />
      ) : (
        <MoonIcon className="h-6 w-6 text-[#000]" />
      )}
        </button>
    </div>
)};
  
  export default Header;
  