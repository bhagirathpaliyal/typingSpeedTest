import { useEffect, useRef, useState } from "react";

const App = () => {
  let paragraphs = [
    "In a world full of constant change, it's easy to feel lost in the shuffle. However, every experience, every encounter, and every challenge presents an opportunity for growth. Embrace each moment with open arms, for it's not the destination that defines us, but the journey itself",
    "Technology continues to advance at a rapid pace, shaping the way we live, work, and communicate. While there are countless benefits to these innovations, it's crucial to pause and reflect on how they impact our lives, our relationships, and our future. Striking a balance between progress and mindfulness is key to a prosperous tomorrow.",
    "The beauty of nature is often found in its simplicity. From the rustling leaves to the flowing streams, nature reminds us of the importance of slowing down and appreciating the little things. In a fast-paced world, it's essential to reconnect with the natural world and find peace in its rhythms.",
    "Life is a series of choices, each one leading us down a different path. Some decisions are easy, others more difficult, but each one shapes our journey in profound ways. The key to a fulfilling life lies in making choices that align with our values, passions, and purpose, no matter how challenging they may seem.",
    "Success is often seen as the end goal, but it’s the lessons learned along the way that truly define us. Failure, setbacks, and unexpected obstacles are not roadblocks but stepping stones toward achieving our dreams. Each experience is a valuable teacher, guiding us toward the person we are meant to become.",
  ];

  const [text, setText] = useState<string>("");

  const [textBlur, setTextBlur] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);

  const [typedText, setTypedText] = useState("");

  const [timeLeft, setTimeLeft] = useState(60);

  const reStart = () => {
    const randomNumber = Math.floor(Math.random() * paragraphs.length);
    setText(paragraphs[randomNumber]);
    if(inputRef.current){
      inputRef.current.focus();
      setTypedText('')
    inputRef.current.value='';
    inputRef.current.disabled = false;
    setTimeLeft(60);
    
    }
    
  };

  // useEffect(() => {
  //   reStart();
  // }, []);

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
  const [wordsTyped, setWordsTyped] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    if (!textBlur) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
     
      return () => clearInterval(timer);
    }
  }, [textBlur]);

  useEffect(() => {
    if (timeLeft == 0) {
      setTextBlur(true);
      setWordsTyped(typedText.split(" ").length);
      setCorrectChars(
        typedText.split("").filter((char, i) => char === text[i]).length
      );
      setAccuracy(parseFloat(((correctChars / text.length) * 100).toFixed(2)));
      if (inputRef.current) {
        inputRef.current.disabled = true;
      }
    }else{
      if (inputRef.current) {
        inputRef.current.disabled = false;
      }
    }
  }, [timeLeft, textBlur]);


  useEffect(() => {
    if(textBlur ){
      if (inputRef.current) {
           inputRef.current.disabled = true;
      }
   
    }
    reStart();
    
  }, [])
  
  return (
    <div className="flex flex-col items-center p-4 min-h-screen bg-gradient-to-r from-[#FFFFFF] via-[#F5F5F5] to-[#D6D6D6] text-[#000]">
    <h1 className="text-3xl text-[#B0B0B0] font-bold mb-4 animate-fadeIn">Typing Speed Test</h1>
    
    <input
      type="text"
      ref={inputRef}
      placeholder="Start typing..."
      className="opacity-0"
      value={typedText}
      onChange={(e) => setTypedText(e.target.value)}
    />


    <div
      className={`bg-white text-black rounded-lg shadow-lg p-4 w-full md:w-2/3 text-xl leading-7 mt-6`}
      onClick={handleClick}
    >
      <div>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`transition-all duration-200 ${
        textBlur ? "blur-[4px]" : "blur-none"
      } ${
            typedText[i] === char
              ? "text-green-600"
              : typedText[i] === undefined
              ? "text-gray-500"
              : "text-red-600"
          }`}
        >
          {char}
        </span>
      ))}
      </div>
    
    </div>


    <div className="w-full md:w-2/3 mt-4">
      <div className="bg-gray-300 h-2 rounded-full overflow-hidden">
        <div
          className="bg-[#B0B0B0] h-full"
          style={{ width: `${(timeLeft / 60) * 100}%` }}
        />
      </div>
      <p className="text-center mt-2">Progress</p>
    </div>

    <button
      onClick={reStart}
      className="mt-4 px-6 py-2 rounded-full bg-[#B0B0B0] hover:bg-[#8d8c8c] text-white font-semibold transition duration-300"
    >
      Restart
    </button>
    

    <div className="flex flex-wrap-reverse gap-[2px] justify-center mt-6 w-full md:w-2/3 space-y-2 md:space-y-0">
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border rounded-lg">
        Words Typed: {wordsTyped}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border rounded-lg">
        Correct Characters: {correctChars}
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border rounded-lg">
        Accuracy: {accuracy}%
      </div>
      <div className="w-full md:w-1/4 flex justify-center items-center p-2 border rounded-lg">
        Time Left: {timeLeft}s
      </div>
    </div>

   
  </div>

  );
};

export default App;
