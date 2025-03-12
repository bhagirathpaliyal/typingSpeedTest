import React, { Dispatch, RefObject, SetStateAction, useRef } from "react";
import clickSound from "../assets/typingSoundEffect.mp3";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
// import {
//   ToggleGroup,
//   ToggleGroupItem,
// } from "@/components/ui/toggle-group"


interface TypingBoxProps {
  text: string;
  textBlur: boolean;
  typedText: string;
  setTypedText: React.Dispatch<React.SetStateAction<string>>;
  inputRef: RefObject<HTMLInputElement>;
  handleClick: () => void;
  timeLeft: number;
    setSelectTime: Dispatch<SetStateAction<number>>;
    selectTime: number;
    timeDropDownVisible: boolean;
    setDifficulty:Dispatch<SetStateAction<string>>,
    difficulty:string
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
  setSelectTime,
  selectTime,
  setDifficulty,
  difficulty

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
  const handleTimeChange = (event: string) => {
    const selectedTime = Number(event);
    setSelectTime(selectedTime);
  };

  return (
    <div className="p-4 flex flex-col justify-center items-center gap-4">

<div className={`flex gap-4 ${textBlur ? "block" : "hidden"}`}>

{/* <ToggleGroup type="single">
      <ToggleGroupItem value="Easy" aria-label="Toggle Easy" onClick={() => setDifficulty("easy")} className={`${
                difficulty === "easy" ? "bg-gray-600 text-white" : "bg-gray-300"
              }`} >
      Easy
      </ToggleGroupItem>
      <ToggleGroupItem value="Hard" aria-label="Toggle Hard" onClick={() => setDifficulty("hard")} className={`${
                difficulty !== "easy" ? "bg-gray-600 text-white" : "bg-gray-300"
              }`} >
        Hard
      </ToggleGroupItem >
    </ToggleGroup> */}
            <Button
            variant={`${
              difficulty === "easy" ? "default" : "secondary"
            }`}
              
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </Button>
            <Button
              variant={`${
                difficulty !== "easy" ? "default" : "secondary"
              }`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </Button>
          </div>



    <Progress value={((timeLeft / selectTime) * 100)} className="w-[80%]"/>

    <div className="w-full md:w-1/4 ">
            {timeDropDownVisible ? (
            <Select onValueChange={handleTimeChange}>
            <SelectTrigger >
              <SelectValue placeholder={selectTime} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={'15'}>15s</SelectItem>
              <SelectItem value={'30'}>30s</SelectItem>
              <SelectItem value={'60'}>60s</SelectItem>
            </SelectContent>
          </Select>
          
            ) : (
              <div className="p-2 flex justify-center items-center border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">Time: {timeLeft}s</div>
            )}
          </div>
      <input
        type="text"
        onKeyDown={handleKeyPress}
        ref={inputRef}
        className="opacity-0 h-0 w-0"
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
    </div>
  );
};

export default TypingBox;
