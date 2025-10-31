import { useState } from "react";
import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

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

// Helper function to detect if text contains LaTeX
const hasLaTeX = (text: string): boolean => {
  return /[$][^$]+[$]|[$$][^$]+[$$]/.test(text);
};

// Helper function to render content with proper formatting
const renderQuestionContent = (text: string) => {
  if (hasLaTeX(text)) {
    return <BlockMath math={text} />;
  }
  return <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{text}</p>;
};

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
      const currentAnswer = Array.isArray(selectedAnswer)
        ? selectedAnswer
        : [];
      const newSelection = currentAnswer.includes(optionId)
        ? currentAnswer.filter((id) => id !== optionId)
        : [...currentAnswer, optionId];
      onAnswer(newSelection);
    }
  };

  const isCorrectAnswer = (optionId: string) => {
    if (singleSelect) {
      return question.correctAnswer === optionId;
    }
    return (
      Array.isArray(question.correctAnswer) &&
      question.correctAnswer.includes(optionId)
    );
  };

  const isSelected = (optionId: string) => {
    if (singleSelect) {
      return selectedAnswer === optionId;
    }
    return (
      Array.isArray(selectedAnswer) && selectedAnswer.includes(optionId)
    );
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline">
                Question {questionNumber} of {totalQuestions}
              </Badge>
              {question.category && (
                <Badge variant="secondary">{question.category}</Badge>
              )}
              {question.difficulty && (
                <Badge
                  variant="outline"
                  className={`${
                    question.difficulty === "Easy"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : question.difficulty === "Medium"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                        : "bg-red-50 text-red-700 border-red-200"
                  }`}
                >
                  {question.difficulty}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-semibold">
              {renderQuestionContent(question.prompt)}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const optionId = String.fromCharCode(65 + index);
            const isSelected_ = isSelected(optionId);
            const isCorrect = isCorrectAnswer(optionId);

            return (
              <button
                key={optionId}
                onClick={() => handleOptionClick(optionId)}
                disabled={showResult || isReview}
                className={`w-full p-3 text-left border rounded-lg transition-all ${
                  showResult || isReview
                    ? isCorrect
                      ? "border-green-500 bg-green-50"
                      : isSelected_ && !isCorrect
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    : isSelected_
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-accent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded border border-current flex items-center justify-center text-sm font-medium">
                    {optionId}
                  </div>
                  <div className="flex-1 text-sm text-foreground">
                    {renderQuestionContent(option)}
                  </div>
                  {showResult && (
                    <div className="flex-shrink-0">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : isSelected_ ? (
                        <XCircle className="w-5 h-5 text-red-600" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
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
                <p className="font-semibold text-sm text-warning-foreground mb-1">
                  Hint:
                </p>
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
                <p className="font-semibold text-sm text-primary mb-1">
                  Explanation:
                </p>
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
