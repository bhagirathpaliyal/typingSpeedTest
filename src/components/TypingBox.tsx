import React, { RefObject, useState } from "react";
interface TypingBoxProps {
    text: string;
    textBlur: boolean;
    typedText: string;
    setTypedText: React.Dispatch<React.SetStateAction<string>>;
    inputRef: RefObject<HTMLInputElement>;
    handleClick: () => void;
  }

const TypingBox :React.FC<TypingBoxProps> = ({ text, textBlur, typedText, setTypedText, inputRef, handleClick }) =>{ 
 
  
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key=='Enter') {
      handleClick()
    }
  };
  return (
  <>
    <input
      type="text"
      onKeyDown={handleKeyPress}
      ref={inputRef}
      
      className="opacity-0"
      value={typedText}
      onChange={(e) => setTypedText(e.target.value)}
    />
    <div
      className={`hover:bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6]
          hover:dark:from-[#1E1E1E] dark:via-[#2E2E2E] dark:to-[#3E3E3E] text-black rounded-lg p-4 w-full md:w-2/3 text-xl leading-7 mt-6`}
      onClick={handleClick}
    >
      <div>
        {text.split("").map((char:any, i:any) => (
          <span
            key={i}
            className={`transition-all duration-200 ${
              textBlur ? "blur-[4px]" : "blur-none"
            } ${
              typedText[i] === char
                ? "text-green-600"
                : typedText[i] === undefined
                ? "text-gray-500"
                : "text-red-600"
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  </>
)};

export default TypingBox;
