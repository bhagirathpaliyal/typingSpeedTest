import React from "react";
import { Button } from "@/components/ui/button";

interface RestartButtonProps {
  reStart: () => void;
}

const RestartButton: React.FC<RestartButtonProps> = ({ reStart }) => (
  <Button onClick={reStart}>Restart</Button>
);

export default RestartButton;
