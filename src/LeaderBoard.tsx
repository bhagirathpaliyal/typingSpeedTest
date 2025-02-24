import React from 'react'

type LeaderBoardProps = {
    leaderboard: { name: string; score: number }[];
  };
const LeaderBoard: React.FC<LeaderBoardProps> = ({leaderboard}) => {

    return (
        <div className="leaderboard p-2">
          <h2 className="text-xl font-bold mb-2">Leaderboard</h2>
          <ul>
            {leaderboard.map((entry:any, index:any) => (
              <li key={index} className="flex justify-between p-2 bg-white rounded-lg mb-2 shadow">
                <span>{index + 1}. {entry.name}</span>
                <span>{entry.score} WPM</span>
              </li>
            ))}
          </ul>
        </div>
      );
      
  
}

export default LeaderBoard