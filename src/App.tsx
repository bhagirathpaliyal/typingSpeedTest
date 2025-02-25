import { useEffect, useRef, useState } from "react";
import { logPageView } from "./utils/analytics";
import Header from "./components/Header";
import TypingBox from "./components/TypingBox";
// import ProgressBar from "./components/ProgressBar";
import Stats from "./components/Stats";
import RestartButton from "./components/RestartButton";
import Footer from "./components/Footer";
import LeaderBoard from "./components/LeaderBoard";
import { db, collection, addDoc, getDocs, query, orderBy } from "./firebaseConfig";
const App = () => {
  const paragraphs = [
    "the sun rises in the east and fills the world with light and warmth each morning the sky glows with beautiful colors and birds sing their cheerful songs people wake up and start their day full of energy and hope the flowers bloom and trees sway gently in the breeze nature reminds us to keep going and embrace the changes around us every sunrise brings new opportunities to grow and explore life is a journey where every step matters and every moment is precious",
    "fruits are nature's gifts to us filled with vitamins and nutrients that keep our bodies healthy apples are sweet and crunchy bananas are soft and easy to eat oranges are juicy and full of flavor eating fruits every day gives us energy and helps us stay strong they are not only delicious but also colorful and fun to eat whether it is a ripe mango a slice of watermelon or a handful of berries fruits bring joy and nutrition to our lives",
    "the sky is blue and stretches endlessly above us on a clear day it feels like an open invitation to step outside and enjoy the fresh air parks become alive with laughter as children run and play families gather on the grass sharing food and stories friends fly kites while the gentle breeze carries the scent of blooming flowers being in nature reminds us to slow down and appreciate the little things in life moments like these are what create lasting memories",
    "cats are curious creatures with soft fur and bright eyes they move quietly and gracefully exploring their surroundings with endless curiosity they love to chase after strings jump onto high places and hide in cozy spots even though they seem independent cats form strong bonds with their owners they show their love by purring softly and rubbing against your legs their playful nature and gentle behavior make them wonderful companions bringing joy to every home they enter",
    "water is essential for all living beings on earth it flows in rivers and streams fills lakes and oceans and supports life everywhere we use water for drinking cooking cleaning and growing food it keeps us healthy and strong and it is important to protect this valuable resource many people in the world do not have enough clean water to drink and it is up to us to save water and prevent pollution every small action we take helps to preserve water for the future",
  ];

  const [text, setText] = useState<string>("");
  const [textBlur, setTextBlur] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [wordsTyped, setWordsTyped] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeDropDownVisible, setTimeDropDownVisible] = useState(true);
  const [leaderboard, setLeaderboard] = useState<
    { name: string; score: number }[]
  >([]);

  const reStart = () => {
    const randomNumber = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomNumber]);
    if (inputRef.current) {
      inputRef.current.focus();
      setTypedText("");
      inputRef.current.value = "";
      inputRef.current.disabled = false;
      setTimeLeft(30);
      setTextBlur(false);
    }
    setTimeDropDownVisible(false);
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
      if (timeLeft > 0) {
        inputRef.current.focus();
        setTimeDropDownVisible(false);
      } else {
        reStart();
        
      }
    }
    setTextBlur(false);
  };

  useEffect(() => {
    logPageView();
    const randomNumber = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomNumber]);
  }, []);

  useEffect(() => {
    if (!textBlur) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [textBlur]);

  const temp = typedText.split("").filter((char, i) => char === text[i]).length;

  useEffect(() => {
    if (timeLeft === 0) {
      setTextBlur(true);
      setWordsTyped(typedText.split(" ").length);
      setCorrectChars(temp);
      setAccuracy(parseFloat(((temp / text.length) * 100).toFixed(2)));
      setTimeDropDownVisible(true);
      handleTypingTestEnd(wordsTyped);
      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
    }
  }, [timeLeft, typedText]);

  const handleTypingTestEnd = (wpm: number) => {
    const userName = prompt("Enter your name for the leaderboard:");
    if (userName) {
      addScoreToLeaderboard(userName, wpm);
    }
  };

  

const addScoreToLeaderboard = async (name: string, score: number) => {
  try {
    await addDoc(collection(db, "leaderboard"), {
      name,
      score,
      timestamp: new Date(),
    });
    fetchLeaderboard(); 
  } catch (error) {
    console.error("Error adding score:", error);
  }
};

const fetchLeaderboard = async () => {
  const leaderboardRef = collection(db, "leaderboard");
  const q = query(leaderboardRef, orderBy("score", "desc"));
  const querySnapshot = await getDocs(q);

  const leaderboardData = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as { name: string; score: number }) 
  }));

  setLeaderboard(leaderboardData);
};


useEffect(() => {
  fetchLeaderboard();
}, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6]  dark:from-[#1E1E1E] dark:via-[#2E2E2E] dark:to-[#3E3E3E] text-gray-900 dark:text-gray-100">
      <Header />

      <div className="flex flex-wrap-reverse w-full px-6 gap-6">
        <div className="w-1/3 bg-white/20 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl shadow-lg max-sm:w-full">
          <LeaderBoard leaderboard={leaderboard} />
        </div>

        <div className="flex flex-col items-center flex-1 space-y-6 p-6 bg-white/20 dark:bg-black/30 rounded-2xl shadow-lg">
          <TypingBox
            text={text}
            textBlur={textBlur}
            typedText={typedText}
            setTypedText={setTypedText}
            inputRef={inputRef}
            handleClick={handleClick}
          />

          <RestartButton reStart={reStart} />

          <Stats
            wordsTyped={wordsTyped}
            correctChars={correctChars}
            accuracy={accuracy}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            timeDropDownVisible={timeDropDownVisible}
            setTimeDropDownVisible={setTimeDropDownVisible}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
