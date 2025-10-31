import { useState } from "react";
import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, CheckCircle2, XCircle, Eye } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (selectedOptions: string[] | string) => void;
  selectedAnswer?: string[] | string;
  showResult?: boolean;
  isReview?: boolean;
  singleSelect?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer = [],
  showResult = false,
  isReview = false,
  singleSelect = false,
}: QuestionCardProps) => {
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (optionId: string) => {
    if (showResult || isReview) return;

    if (singleSelect) {
      onAnswer(optionId);
    } else {
      const currentAnswer = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      const newSelection = currentAnswer.includes(optionId)
        ? currentAnswer.filter(id => id !== optionId)
        : [...currentAnswer, optionId];
      onAnswer(newSelection);
    }
  };

  const isCorrectAnswer = (optionId: string) => {
    return question.correct_options.includes(optionId);
  };

  const isWrongAnswer = (optionId: string) => {
    const answer = Array.isArray(selectedAnswer) ? selectedAnswer : [selectedAnswer];
    return showResult && answer.includes(optionId) && !question.correct_options.includes(optionId);
  };

  const getOptionStyle = (optionId: string) => {
    const answer = Array.isArray(selectedAnswer) ? selectedAnswer : selectedAnswer ? [selectedAnswer] : [];
    if (!showResult && !isReview) {
      return answer.includes(optionId)
        ? "border-primary bg-primary/10"
        : "border-border hover:border-primary/50";
    }

    if (isCorrectAnswer(optionId)) {
      return "border-success bg-success/10";
    }

    if (isWrongAnswer(optionId)) {
      return "border-destructive bg-destructive/10";
    }

    return "border-border";
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-card animate-fade-in">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="text-sm">
            Question {questionNumber} of {totalQuestions}
          </Badge>
          <Badge className="bg-gradient-primary text-primary-foreground">
            {question.category}
          </Badge>
        </div>
        <CardTitle className="text-xl md:text-2xl leading-relaxed">
          {question.prompt}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id)}
              disabled={showResult || isReview}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${getOptionStyle(
                option.id
              )} ${!(showResult || isReview) && "cursor-pointer"} flex items-center justify-between group`}
            >
              <span className="flex-1">{option.text}</span>
              {showResult && isCorrectAnswer(option.id) && (
                <CheckCircle2 className="w-5 h-5 text-success ml-2" />
              )}
              {isWrongAnswer(option.id) && (
                <XCircle className="w-5 h-5 text-destructive ml-2" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHint(!showHint)}
            className="gap-2"
          >
            <Lightbulb className="w-4 h-4" />
            {showHint ? "Hide" : "Show"} Hint
          </Button>
          {(showResult || isReview) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowExplanation(!showExplanation)}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              {showExplanation ? "Hide" : "Show"} Explanation
            </Button>
          )}
        </div>

        {showHint && (
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg animate-slide-up">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-warning-foreground mb-1">Hint:</p>
                <p className="text-sm text-foreground">{question.hint}</p>
              </div>
            </div>
          </div>
        )}

        {showExplanation && (showResult || isReview) && (
          <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg animate-slide-up">
            <div className="flex items-start gap-2">
              <Eye className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm text-primary mb-1">Explanation:</p>
                <p className="text-sm text-foreground">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
