import React, { RefObject, useRef } from "react";
import clickSound from "../assets/typingSoundEffect.mp3";

interface TypingBoxProps {
  text: string;
  textBlur: boolean;
  typedText: string;
  setTypedText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  handleClick: () => void;
}

const TypingBox: React.FC<TypingBoxProps> = ({
  text,
  textBlur,
  typedText,
  setTypedText,
  inputRef,
  handleClick,
}) => {
  const soundRef = useRef(new Audio(clickSound));

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleClick();
    } else {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((err) => console.error("Sound Error:", err));
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
        className="hover:bg-gradient-to-r from-white via-gray-200 to-gray-300 
          hover:dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 
          text-black rounded-lg p-4 w-full md:w-2/3 text-xl leading-7 mt-6 cursor-pointer"
        onClick={handleClick}
      >
        <div>
          {text.split("").map((char, i) => (
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
  );
};

export default TypingBox;
