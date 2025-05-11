import html2canvas from "html2canvas";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Aperture ,Twitter,Copy} from 'lucide-react';


type ShareResultProps={
    wpm: number;
    accuracy: number;
}



const ShareResult: React.FC<ShareResultProps> = ({ wpm, accuracy }) => {
  const [copied, setCopied] = useState(false);


  const handleScreenshot = async () => {
    const element = document.getElementById("result-container");
  
    if (!element) {
      alert("Result container not found!");
      return;
    }
  
    try {
      const canvas = await html2canvas(element, {
        backgroundColor: "#ffffff", 
        scale: 2, 
        useCORS: true, 
      });
  
      const imgData = canvas.toDataURL("image/png");
  
     
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "typing-test-result.png";
      link.click();
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };

  const shareText = `🚀 I just scored ${wpm} WPM with ${accuracy}% accuracy on this typing test! Try it yourself: https://bhagirathpaliyal.github.io/typingSpeedTest/`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={`flex flex-col w-[90%] ${wpm==0?'hidden':'block'} bg-white/20 dark:bg-black/30 backdrop-blur-md p-4 rounded-2xl shadow-lg mt-4`}>
        <div>
      
      <div id="result-container" className="p-4 border rounded-lg  shadow-lg bg-white dark:bg-black/30">
        <h2 className="text-xl font-bold">Typing Test Result</h2>
        <p>🚀 Speed: {wpm} WPM</p>
        <p>🎯 Accuracy: {accuracy}%</p>
      </div>

      
     
    </div>
    <div className="flex max-sm:flex-wrap gap-4 mt-4">
      
      <Button
        onClick={handleCopy}
        
      >
        {copied ? "Copied!" : <Copy/>}
      </Button>

      <Button
        onClick={handleScreenshot}
      
      >
        <Aperture/>
        Capture Screenshot
      </Button>

      <Button>
      <a
        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Share on WhatsApp
      </a>
      </Button>

      <Button>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-[4px]"
       
      >
        <Twitter/>
        Share on Twitter
      </a>
      </Button>
      
    </div>
  </div>);
};

export default ShareResult;
