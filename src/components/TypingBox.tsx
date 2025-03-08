import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";
import clickSound from "../assets/typingSoundEffect.mp3";
import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import ProgressBar from "./ProgressBar";

interface TypingBoxProps {
  text: string;
  textBlur: boolean;
  typedText: string;
  setTypedText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  handleClick: () => void;
  timeLeft: number;
    setSelectTime: Dispatch<SetStateAction<number>>;
    timeDropDownVisible: boolean;
}

const TypingBox: React.FC<TypingBoxProps> = ({
  text,
  textBlur,
  typedText,
  setTypedText,
  inputRef,
  handleClick,
  timeLeft,
  timeDropDownVisible,
  setSelectTime

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
  const handleTimeChange = (event: SelectChangeEvent<number>) => {
    const selectedTime = Number(event.target.value);
    setSelectTime(selectedTime);
  };

  return (
    <>
    <div className="w-full md:w-1/4 flex justify-center items-center border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
            {timeDropDownVisible ? (
    
            <FormControl fullWidth>
              <Select
                defaultValue={60}
                onChange={handleTimeChange}
                variant="outlined"
                displayEmpty
                sx={{
                  maxHeight:"40px",
                  backgroundColor: "none ", 
                  color: "#B0B0B0",
                  borderRadius: "8px",
                  padding:'0px',
                  fontWeight: "medium",
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" }, 
                  "&:hover": {
                    backgroundColor: "none", 
                  },
                  "&.Mui-focused": {
                    backgroundColor: "none", 
                  },
                }}
              >
                <MenuItem value={15}>15s</MenuItem>
                <MenuItem value={30}>30s</MenuItem>
                <MenuItem value={60}>60s</MenuItem>
              </Select>
            </FormControl>
            
            ) : (
              <div className="p-2 ">Time: {timeLeft}s</div>
            )}
          </div>
      <input
        type="text"
        onKeyDown={handleKeyPress}
        ref={inputRef}
        className="opacity-0 absolute left-[-100]"
        value={typedText}
        onChange={(e) => setTypedText(e.target.value)}
        
      />

      <div
        className="text-black rounded-lg p-2 w-full  text-xl leading-7 cursor-pointer"
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
