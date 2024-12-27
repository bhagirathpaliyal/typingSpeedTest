import { useEffect, useRef, useState } from "react";
import { logPageView } from "./utils/analytics";
import Header from "./components/Header";
import TypingBox from "./components/TypingBox";
import ProgressBar from "./components/ProgressBar";
import Stats from "./components/Stats";
import RestartButton from "./components/RestartButton";

const App = () => {
  const paragraphs = [
    "The sun rises in the east and fills the world with light and warmth. Each morning the sky glows with beautiful colors and birds sing their cheerful songs. People wake up and start their day full of energy and hope. The flowers bloom and trees sway gently in the breeze. Nature reminds us to keep going and embrace the changes around us. Every sunrise brings new opportunities to grow and explore. Life is a journey where every step matters and every moment is precious.",
    "Fruits are nature's gifts to us filled with vitamins and nutrients that keep our bodies healthy. Apples are sweet and crunchy. Bananas are soft and easy to eat. Oranges are juicy and full of flavor. Eating fruits every day gives us energy and helps us stay strong. They are not only delicious but also colorful and fun to eat. Whether it is a ripe mango a slice of watermelon or a handful of berries fruits bring joy and nutrition to our lives.",
   "The sky is blue and stretches endlessly above us. On a clear day it feels like an open invitation to step outside and enjoy the fresh air. Parks become alive with laughter as children run and play. Families gather on the grass sharing food and stories. Friends fly kites while the gentle breeze carries the scent of blooming flowers. Being in nature reminds us to slow down and appreciate the little things in life. Moments like these are what create lasting memories.",
   "Cats are curious creatures with soft fur and bright eyes. They move quietly and gracefully exploring their surroundings with endless curiosity. They love to chase after strings jump onto high places and hide in cozy spots. Even though they seem independent cats form strong bonds with their owners. They show their love by purring softly and rubbing against your legs. Their playful nature and gentle behavior make them wonderful companions bringing joy to every home they enter.",
   "Water is essential for all living beings on Earth. It flows in rivers and streams fills lakes and oceans and supports life everywhere. We use water for drinking cooking cleaning and growing food. It keeps us healthy and strong and it is important to protect this valuable resource. Many people in the world do not have enough clean water to drink and it is up to us to save water and prevent pollution. Every small action we take helps to preserve water for the future."
  ];

  const [text, setText] = useState<string>("");
  const [textBlur, setTextBlur] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [typedText, setTypedText] = useState("");
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [wordsTyped, setWordsTyped] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [accuracy, setAccuracy] = useState(0);

  const reStart = () => {
    const randomNumber = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomNumber]);
    if (inputRef.current) {
      inputRef.current.focus();
      setTypedText("");
      inputRef.current.value = "";
      inputRef.current.disabled = false;
      setTimeLeft(60);
     
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
      if (timeLeft > 0) {
        inputRef.current.focus();
        
      } else {
        reStart();
       
        
      }
    }
    setTextBlur(false);
  };

  useEffect(() => {
    logPageView();
    reStart();
  }, []);

  useEffect(() => {
    if (!textBlur) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [textBlur]);

  useEffect(() => {
    if (timeLeft === 0) {
      setTextBlur(true);
      setWordsTyped(typedText.split(" ").length);
      setCorrectChars(
        typedText.split("").filter((char, i) => char === text[i]).length
      );
      setAccuracy(parseFloat(((correctChars / text.length) * 100).toFixed(2)));
      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
    }
  }, [timeLeft]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6] text-[#000]">
      <Header />
      <TypingBox
        text={text}
        textBlur={textBlur}
        typedText={typedText}
        setTypedText={setTypedText}
        inputRef={inputRef}
        handleClick={handleClick}
      />
      <ProgressBar timeLeft={timeLeft} />
      <RestartButton reStart={reStart} />
      <Stats
        wordsTyped={wordsTyped}
        correctChars={correctChars}
        accuracy={accuracy}
        timeLeft={timeLeft}
      />
    </div>
  );
};

export default App;
