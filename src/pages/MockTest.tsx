import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, getRandomQuestions, Question } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import Timer from "@/components/Timer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Settings, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MockTest = () => {
  const navigate = useNavigate();
  const [testStarted, setTestStarted] = useState(false);
  const [testQuestions, setTestQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [duration] = useState(30 * 60); // 30 minutes in seconds

  const questionCount = 30; // Fixed total number of questions
  const questionsPerCategory = 5; // Fixed 5 per category

  const startTest = () => {
    // Ensure we have enough categories and questions
    const selectedCategories = categories;
    const questions: Question[] = [];

    selectedCategories.forEach((category) => {
      const categoryQuestions = getRandomQuestions(questionsPerCategory, [category]);
      questions.push(...categoryQuestions);
    });

    setTestQuestions(questions.slice(0, questionCount)); // Limit to 30
    setCurrentIndex(0);
    setAnswers({});
    setTestStarted(true);
  };

  const handleAnswer = (selectedOption: string) => {
    setAnswers({ ...answers, [testQuestions[currentIndex].id]: selectedOption });
  };

  const handleNext = () => {
    if (currentIndex < testQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = () => {
    navigate("/result", { state: { answers, questions: testQuestions } });
  };

  const handleTimeUp = () => {
    handleSubmit();
  };

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <Card className="max-w-2xl mx-auto shadow-elevated">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Settings className="w-6 h-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-2xl">Mock Test Configuration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Categories Included
                </Label>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  {categories.map((category) => (
                    <li key={category}>{category}</li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-base font-semibold">Total Questions: 30</p>
                <p className="text-sm text-muted-foreground">
                  5 questions from each category · Duration: 30 minutes
                </p>
              </div>

              <Button
                onClick={startTest}
                className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground"
                size="lg"
              >
                Start Mock Test
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  const currentQuestion = testQuestions[currentIndex];
  const progress = ((currentIndex + 1) / testQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Timer and Progress */}
          <div className="grid md:grid-cols-2 gap-4">
            <Timer duration={duration} onTimeUp={handleTimeUp} />
            <Card className="shadow-card">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Questions Answered</span>
                    <span className="font-semibold">
                      {answeredCount} / {testQuestions.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question */}
          <QuestionCard
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={testQuestions.length}
            onAnswer={handleAnswer}
            selectedAnswer={answers[currentQuestion.id]}
            singleSelect={true}
          />

          {/* Navigation */}
          <div className="flex gap-4 justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <div className="flex gap-2">
              {currentIndex === testQuestions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-success hover:bg-success/90 text-success-foreground"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Test
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-primary hover:opacity-90"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MockTest;
