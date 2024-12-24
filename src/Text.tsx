import { useEffect, useRef, useState } from "react";

const Text = () => {
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
    setTimeLeft(10);
    
    }
    
  };

  useEffect(() => {
    reStart();
  }, []);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.disabled = false;
      if (timeLeft > 0) {
       
        inputRef.current.focus();
        
        
      } else {
        reStart();
        // setTimeLeft(60);
        // inputRef.current.value='';
        // inputRef.current.disabled = false;
        // inputRef.current.focus();
        
        
        
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

  return (
    <div className="flex flex-col justify-center items-center">
      <input
        type="text"
        name=""
        id=""
        ref={inputRef}
        placeholder="hello"
        className="opacity-0"
        onChange={(e) => {
          setTypedText(e.target.value), textBlur && setTextBlur(false);
        }}
      />
      <button
        className={`${
          textBlur ? "block blur-none" : "hidden"
        } absolute top-[50%]`}
        onClick={handleClick}
      >
        click here to continue
      </button>
      <div
        className={`${textBlur ? "blur-[4px]" : "blur-none"} w-[50%]`}
        onClick={handleClick}
      >
        {text.split("").map((char, i) => (
          <span
            key={i}
            className={`${
              typedText[i] === char
                ? "text-green-500"
                : typedText[i] === undefined
                ? ""
                : "text-red-500"
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <button
        onClick={() => reStart()}
        className="z-10 mt-[10px] rounded-[20px] border w-[50%] hover:bg-[#857171] duration-500 p-1"
      >
        Re-Start
      </button>
      <div className="flex justify-between  w-[50%] mt-2">
        <div className="border w-full flex justify-center rounded-l-[20px] p-1">Words Typed: {wordsTyped}</div>
        <div className="border w-full flex justify-center p-1">Correct Characters: {correctChars}</div>
        <div className="border w-full flex justify-center p-1">Accuracy: {accuracy}%</div>
        <div className="border w-full flex justify-center rounded-r-[20px] p-1">Time Left: {timeLeft}s</div>
      </div>
    
    </div>
  );
};

export default Text;
