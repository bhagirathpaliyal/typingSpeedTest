import React from "react";

interface StatsProps {
    wordsTyped: number;
    correctChars: number;
    accuracy: number;
    timeLeft: number;
  }

const Stats : React.FC<StatsProps> = ({ wordsTyped, correctChars, accuracy, timeLeft }) => (
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
        Time: {timeLeft}s
      </div>
    </div>
  );
  
  export default Stats;
  