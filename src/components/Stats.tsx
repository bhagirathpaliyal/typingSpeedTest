import { FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

interface StatsProps {
  wordsTyped: number;
  correctChars: number;
  accuracy: number;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  timeDropDownVisible: boolean;
  setTimeDropDownVisible: Dispatch<SetStateAction<boolean>>;
}

const Stats: React.FC<StatsProps> = ({
  wordsTyped,
  correctChars,
  accuracy,
  timeLeft,
  setTimeLeft,
  timeDropDownVisible,
  setTimeDropDownVisible,
}) => {

  const handleTimeChange = (event: SelectChangeEvent<number>) => {
    const selectedTime = Number(event.target.value);
    setTimeLeft(selectedTime);
    setTimeDropDownVisible(false); 
  };

  return (
    <div  className="flex flex-wrap-reverse gap-[2px] justify-center mt-6 w-full md:w-2/3 space-y-2 md:space-y-0 dark:text-[#fff] text-[#000]">
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        WPM: {wordsTyped}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        Correct Char: {correctChars}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        Acc: {accuracy}%
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        {timeDropDownVisible ? (

        <FormControl fullWidth>
          <Select
            defaultValue={30}
            onChange={handleTimeChange}
            variant="outlined"
            displayEmpty
            sx={{
              backgroundColor: "none ", 
              color: "#B0B0B0",
              borderRadius: "8px",
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
    </div>
  );
};

export default Stats;
