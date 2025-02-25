

  const LeaderBoard = ({ leaderboard }: { leaderboard: { name: string; score: number }[] }) => {

    return (
        <div className="leaderboard p-2">
          <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
          <ul>
            {leaderboard.map((entry:any, index:any) => (
              <li key={index} className="flex justify-between p-2 rounded-lg mb-2 shadow">
                      <span className="text-gray-700 dark:text-gray-300">{entry.name}</span>
                      <span className="text-gray-900 dark:text-white">{entry.score} WPM</span>
              </li>
            ))}
          </ul>
        </div>
      );
      
  
}

export default LeaderBoard