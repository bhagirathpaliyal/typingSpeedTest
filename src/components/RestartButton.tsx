import React from "react";

interface RestartButtonProps {
    reStart: () => void;
  }

const RestartButton: React.FC<RestartButtonProps> = ({ reStart }) => (
    <button
      onClick={reStart}
      className="mt-4 px-6 py-2 rounded-full bg-[#B0B0B0] hover:bg-[#8d8c8c] text-white font-semibold transition duration-300"
    >
      Restart
    </button>
  );
  
  export default RestartButton;
  