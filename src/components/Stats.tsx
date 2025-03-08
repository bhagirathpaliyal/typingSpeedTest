

interface StatsProps {
  wordsTyped: number;
  correctChars: number;
  accuracy: number;

}

const Stats: React.FC<StatsProps> = ({
  wordsTyped,
  correctChars,
  accuracy,
}) => {

 

  return (
    <div  className="flex flex-wrap gap-[2px] justify-center w-full  space-y-2 md:space-y-0 dark:text-[#fff] text-[#000]">

      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        WPM: {wordsTyped}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        Correct Char: {correctChars}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border-2 dark:border rounded-lg text-[#B0B0B0] font-medium">
        Acc: {accuracy}%
      </div>
      
    </div>
  );
};

export default Stats;
