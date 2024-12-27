import React from "react";

interface ProgressBarProps {
    timeLeft: number;
  }

const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft }) => (
    <div className="w-full md:w-2/3 mt-4">
      <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#B0B0B0] h-full"
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>
      <p className="text-center mt-2">Progress</p>
    </div>
  );
  
  export default ProgressBar;
  