const LeaderBoard = ({
  leaderboard,
}: {
  leaderboard: { name: string; score: number }[];
}) => {
  return (
    <div className="leaderboard bg-white/20 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl shadow-lg max-sm:w-full w-1/3">
      <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
      <ul>
        {leaderboard.map((entry: any, index: any) =>
          index < 10 ? (
            <li
              key={index}
              className="flex justify-between p-2 rounded-lg mb-2 shadow"
            >
              <span className="text-gray-700 dark:text-white">
                {entry.name}
              </span>
              <span className="text-gray-900 dark:text-white">
                {entry.score} WPM
              </span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

export default LeaderBoard;
