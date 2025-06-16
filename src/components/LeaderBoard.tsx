import { useEffect, useState } from "react";

const LeaderBoard = ({
  leaderboard,
}: {
  leaderboard: { name: string; score: number }[];
}) => {
  const [visibleEntries, setVisibleEntries] = useState<
    { name: string; score: number }[]
  >([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <  Math.min(10, leaderboard.length)) {
        setVisibleEntries((prev) => [...prev, leaderboard[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 300); 

    return () => clearInterval(interval);
  }, [leaderboard]);

  return (
    <div className="leaderboard bg-white/20 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl shadow-lg max-sm:w-full h-full w-1/3 ">
      <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
      <ul>
        {visibleEntries.map((entry, index) => (
          <li
            key={index}
            className={`flex justify-between p-2 rounded-lg mb-2 shadow transform transition-all duration-500 ease-out opacity-0 animate-[fadeIn_0.5s_forwards]`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <span className="text-gray-700 dark:text-white">{entry.name}</span>
            <span className="text-gray-900 dark:text-white">
              {entry.score} WPM
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
