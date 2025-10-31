import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuestionsByCategory } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Home, RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const Practice = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const allQuestions = getQuestionsByCategory(decodeURIComponent(category || ""));
  
  const shuffleQuestions = () => {
    return [...allQuestions].sort(() => Math.random() - 0.5);
  };
  
  const [questions, setQuestions] = useState(() => shuffleQuestions());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!questions.length) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">No questions found</h2>
          <Button onClick={() => navigate("/")}>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  const handleAnswer = (selectedOption: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: selectedOption });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      toast({
        title: "Practice Complete!",
        description: `You answered ${answeredCount} out of ${questions.length} questions.`,
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleReset = () => {
    setQuestions(shuffleQuestions());
    setCurrentIndex(0);
    setAnswers({});
    toast({
      title: "Progress Reset",
      description: "Your practice session has been reset with shuffled questions.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="outline" onClick={() => navigate("/")} className="mb-4">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {decodeURIComponent(category || "")}
              </h1>
              <Button variant="outline" onClick={handleReset} size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress: {answeredCount} / {questions.length} answered</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Question */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion.id]}
            showResult={!!answers[currentQuestion.id]}
            singleSelect={true}
          />

          {/* Navigation */}
          <div className="flex gap-4 mt-8 justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-primary hover:opacity-90"
            >
              {currentIndex === questions.length - 1 ? "Finish" : "Next"}
              {currentIndex < questions.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Practice;
