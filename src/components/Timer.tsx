import { useEffect, useState } from "react";
import { Clock, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

const Timer = ({ duration, onTimeUp }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const percentage = (timeLeft / duration) * 100;

  const getTimerColor = () => {
    if (percentage > 50) return "text-success";
    if (percentage > 20) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {percentage <= 20 ? (
            <AlertCircle className="w-5 h-5 text-destructive animate-pulse" />
          ) : (
            <Clock className="w-5 h-5 text-primary" />
          )}
          <span className="text-sm font-medium text-muted-foreground">Time Remaining</span>
        </div>
        <div className={`text-2xl font-bold tabular-nums ${getTimerColor()}`}>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </div>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default Timer;
