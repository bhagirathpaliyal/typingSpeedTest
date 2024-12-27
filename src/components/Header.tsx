import { useState } from "react";

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
          className="  px-5 py-2 rounded-lg 
          bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6]
          dark:from-[#1E1E1E] dark:via-[#2E2E2E] dark:to-[#3E3E3E]
          shadow-inner
          text-gray-800 dark:text-gray-200
          hover:shadow-md
          transition-all"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
    </div>
)};
  
  export default Header;
  