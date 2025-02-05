import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";

interface StatsProps {
  wordsTyped: number;
  correctChars: number;
  accuracy: number;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
}

const Stats: React.FC<StatsProps> = ({
  wordsTyped,
  correctChars,
  accuracy,
  timeLeft,
  setTimeLeft,
}) => {
  const [timeDropDownVisible, setTimeDropDownVisible] = useState(true);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTime = parseInt(event.target.value);
    setTimeLeft(selectedTime);
    setTimeDropDownVisible(false); 
  };

  return (
    <div className="flex flex-wrap-reverse gap-[2px] justify-center mt-6 w-full md:w-2/3 space-y-2 md:space-y-0 dark:text-[#fff] text-[#000]">
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg">
        WPM: {wordsTyped}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg">
        Correct Char: {correctChars}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg">
        Acc: {accuracy}%
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg">
        {timeDropDownVisible ? (
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="time-select">
              Select time
            </InputLabel>
            <NativeSelect
              defaultValue={30}
              onChange={handleTimeChange}
              inputProps={{
                name: "time",
                id: "time-select",
              }}
            >
              <option value={15}>15s</option>
              <option value={30}>30s</option>
              <option value={60}>60s</option>
            </NativeSelect>
          </FormControl>
        ) : (
          <div>Time: {timeLeft}s</div>
        )}
      </div>
    </div>
  );
};

export default Stats;
