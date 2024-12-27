import React from "react";

interface RestartButtonProps {
    reStart: () => void;
  }

const RestartButton: React.FC<RestartButtonProps> = ({ reStart }) => (
    <button
      onClick={reStart}
      className="mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6]
          dark:from-[#1E1E1E] dark:via-[#2E2E2E] dark:to-[#3E3E3E] hover:bg-[#8d8c8c] text-[#B0B0B0] font-semibold border"
    >
      Restart
    </button>
  );
  
  export default RestartButton;
  