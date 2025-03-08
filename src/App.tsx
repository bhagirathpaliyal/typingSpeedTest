import { useEffect, useRef, useState } from "react";
import { logPageView } from "./utils/analytics";
import Header from "./components/Header";
import TypingBox from "./components/TypingBox";
// import ProgressBar from "./components/ProgressBar";
import Stats from "./components/Stats";
import RestartButton from "./components/RestartButton";
import Footer from "./components/Footer";
import LeaderBoard from "./components/LeaderBoard";
import {
  db,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "./firebaseConfig";
import ShareResult from "./components/ShareResult";
import ProgressBar from "./components/ProgressBar";

const paragraphs = [
  "the sun rises in the east and fills the world with light and warmth each morning the sky glows with beautiful colors and birds sing their cheerful songs people wake up and start their day full of energy and hope the flowers bloom and trees sway gently in the breeze nature reminds us to keep going and embrace the changes around us every sunrise brings new opportunities to grow and explore life is a journey where every step matters and every moment is precious",
  "fruits are nature's gifts to us filled with vitamins and nutrients that keep our bodies healthy apples are sweet and crunchy bananas are soft and easy to eat oranges are juicy and full of flavor eating fruits every day gives us energy and helps us stay strong they are not only delicious but also colorful and fun to eat whether it is a ripe mango a slice of watermelon or a handful of berries fruits bring joy and nutrition to our lives",
  "the sky is blue and stretches endlessly above us on a clear day it feels like an open invitation to step outside and enjoy the fresh air parks become alive with laughter as children run and play families gather on the grass sharing food and stories friends fly kites while the gentle breeze carries the scent of blooming flowers being in nature reminds us to slow down and appreciate the little things in life moments like these are what create lasting memories",
  "cats are curious creatures with soft fur and bright eyes they move quietly and gracefully exploring their surroundings with endless curiosity they love to chase after strings jump onto high places and hide in cozy spots even though they seem independent cats form strong bonds with their owners they show their love by purring softly and rubbing against your legs their playful nature and gentle behavior make them wonderful companions bringing joy to every home they enter",
  "water is essential for all living beings on earth it flows in rivers and streams fills lakes and oceans and supports life everywhere we use water for drinking cooking cleaning and growing food it keeps us healthy and strong and it is important to protect this valuable resource many people in the world do not have enough clean water to drink and it is up to us to save water and prevent pollution every small action we take helps to preserve water for the future",
];

const hardParagraphs = [
  "As dawn unfurls its golden tendrils across the vast horizon, the world awakens in a symphony of resplendent hues and melodic birdsong. The cerulean sky, streaked with ephemeral shades of crimson and amber, heralds the inception of a new day brimming with boundless possibilities. Each fleeting moment is an invitation to seize opportunities, evolve through adversity, and navigate the intricate tapestry of existence with unwavering resolve. Nature, in its ever-changing grandeur, whispers a gentle reminder to embrace transformation, for every dawn signifies an uncharted expedition into the enigmatic journey of life.",
  "Fruits, nature’s bounteous endowment, encapsulate an array of indispensable nutrients and invigorating flavors, fortifying the body while tantalizing the palate. Crisp, succulent apples exude a perfect balance of sweetness and tartness, while the supple texture of bananas offers effortless consumption. Citrus fruits, bursting with tangy zest, invigorate the senses, bestowing vitality and refreshment. The chromatic brilliance of nature’s harvest is not merely a feast for the eyes but a celebration of nourishment, an edible mosaic of vitamins and antioxidants sustaining both body and spirit.",
  "The boundless azure expanse unfurls above, an ethereal canvas that invokes a profound sense of wonder and introspection. Beneath this celestial dome, verdant parks reverberate with mirth and exuberance as jubilant children frolic with unbridled delight. Families congregate upon the emerald carpet of grass, partaking in convivial conversations and gastronomic indulgence, while kites pirouette aloft, carried by the capricious whispers of the wind. Immersing oneself in nature’s embrace cultivates gratitude for ephemeral pleasures, for it is in such seemingly mundane moments that cherished memories are indelibly etched.",
  "With an enigmatic grace that belies their inquisitive nature, felines traverse their domain in silent, calculated strides, their iridescent eyes glimmering with an insatiable curiosity. Agile and dexterous, they ascend great heights with an effortless leap, their lithe forms coiled in poised anticipation. Though imbued with an air of independence, these enigmatic creatures form profound attachments, their affection manifested in delicate purrs and affectionate nuzzles. Their whimsical antics and beguiling demeanor render them not mere pets, but cherished confidants, infusing every abode with warmth and companionship.",
  "Water, the quintessential elixir of existence, meanders through rivers and cascades into expansive oceans, sustaining a myriad of life forms in its perpetual flow. This transparent yet indispensable element is the cornerstone of vitality, integral to hydration, sustenance, and ecological equilibrium. However, with burgeoning consumption and environmental degradation, its preservation has become an exigent imperative. Every conscientious endeavor—whether curbing wasteful usage or mitigating pollution—fortifies the collective mission to safeguard this invaluable resource for posterity, ensuring that future generations may revel in its life-sustaining essence.",
];

const App = () => {
  const [text, setText] = useState<string>("");
  const [textBlur, setTextBlur] = useState(true);
  const [restartClicked, setRestartClicked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedText, setTypedText] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [selectTime, setSelectTime] = useState<number>(60);
  const [wordsTyped, setWordsTyped] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeDropDownVisible, setTimeDropDownVisible] = useState(true);
  const [leaderboard, setLeaderboard] = useState<
    { name: string; score: number }[]
  >([]);
  let randomNumber;

  useEffect(() => {
    if (difficulty == "hard") {
      randomNumber = Math.floor(Math.random() * hardParagraphs.length);
      setText(hardParagraphs[randomNumber]);
    } else {
      randomNumber = Math.floor(Math.random() * paragraphs.length);
      setText(paragraphs[randomNumber]);
    }
  }, [difficulty, restartClicked]);

  const reStart = () => {
    setRestartClicked((prev) => !prev);
    if (inputRef.current) {
      inputRef.current.focus();
      setTypedText("");
      inputRef.current.value = "";
      inputRef.current.disabled = false;
      setTimeLeft(selectTime);
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
        setTimeLeft(selectTime);
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

      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
      handleTypingTestEnd(typedText.split(" ").length);
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
    try {
      const leaderboardRef = collection(db, "leaderboard");
      const q = query(leaderboardRef, orderBy("score", "desc"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.warn("No leaderboard data found");
        setLeaderboard([]);
        return;
      }

      const leaderboardData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as { name: string; score: number }),
      }));

      setLeaderboard(leaderboardData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6]  dark:from-[#1E1E1E] dark:via-[#2E2E2E] dark:to-[#3E3E3E] text-gray-900 dark:text-gray-100">
      <Header />

      <div className="flex flex-wrap-reverse w-[90%]  gap-6">
        <div className="w-1/3 bg-white/20 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl shadow-lg max-sm:w-full">
          <LeaderBoard leaderboard={leaderboard} />
        </div>

        <div className="flex flex-col items-center flex-1 gap-4 p-2 bg-white/20 dark:bg-black/30 rounded-2xl shadow-lg">
          <div className={`flex gap-4 ${textBlur ? "block" : "hidden"}`}>
            <button
              className={`px-4 py-2 rounded-md ${
                difficulty === "easy" ? "bg-gray-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setDifficulty("easy")}
            >
              Easy
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                difficulty === "hard" ? "bg-gray-600 text-white" : "bg-gray-300"
              }`}
              onClick={() => setDifficulty("hard")}
            >
              Hard
            </button>
          </div>
          <ProgressBar timeLeft={timeLeft} selectTime={selectTime}/>
          <TypingBox
            text={text}
            textBlur={textBlur}
            typedText={typedText}
            setTypedText={setTypedText}
            inputRef={inputRef}
            handleClick={handleClick}
            timeLeft={timeLeft}
            setSelectTime={setSelectTime}
            timeDropDownVisible={timeDropDownVisible}
          />

          <RestartButton reStart={reStart} />

          <Stats
            wordsTyped={wordsTyped}
            correctChars={correctChars}
            accuracy={accuracy}
          />
        </div>
      </div>

      <ShareResult wpm={wordsTyped} accuracy={accuracy} />

      <Footer />
    </div>
  );
};

export default App;
