import { useState } from "react";
import { MoonIcon,SunIcon } from "@heroicons/react/16/solid";

const Header = () => {

 const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };
    return(
    <div className=" flex items-center justify-between h-full w-[96%] border-b mb-[10px] pb-2">
      <h1 className="text-[24px] max-sm:text-[20px] text-[#B0B0B0]  font-bold">Typing Speed Test</h1>

      <button
          onClick={toggleDarkMode}
          className="  px-2 py-2 rounded-full
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
  