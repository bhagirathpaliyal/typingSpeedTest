import React from "react";

interface ProgressBarProps {
    timeLeft: number;
    selectTime:number
  }

const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft,selectTime }) => (
    <div className="w-full md:w-2/3 relative bottom-0">
      <div className="bg-gray-300 dark:bg-[#5d5d5d] h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#B0B0B0] dark:bg-[#000] h-full"
          style={{ width: `${(timeLeft / selectTime) * 100}%` }}
        />
      </div>
      {/* <p className="text-center mt-2 dark:text-[#fff] text-[#000]">Progress</p> */}
    </div>
  );
  
  export default ProgressBar;
  