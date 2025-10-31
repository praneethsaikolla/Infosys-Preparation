import { useLocation, useNavigate } from "react-router-dom";
import { calculateScore, Question } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Home, RotateCcw, CheckCircle2, XCircle, Target } from "lucide-react";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, questions } = location.state as {
    answers: Record<string, string>;
    questions: Question[];
  };

  if (!answers || !questions) {
    navigate("/");
    return null;
  }

  const score = calculateScore(answers);

  const getScoreColor = () => {
    if (score.percentage >= 80) return "text-success";
    if (score.percentage >= 60) return "text-warning";
    return "text-destructive";
  };

  const getPerformanceMessage = () => {
    if (score.percentage >= 80) return "Excellent! You're well-prepared! 🎉";
    if (score.percentage >= 60) return "Good job! Keep practicing to improve! 💪";
    return "Keep learning! Review the explanations below. 📚";
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Score Card */}
          <Card className="shadow-elevated animate-fade-in">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-3xl">Test Results</CardTitle>
                  <p className="text-muted-foreground">{getPerformanceMessage()}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-muted rounded-lg">
                  <Target className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-3xl font-bold text-foreground">{score.total}</div>
                  <div className="text-sm text-muted-foreground">Total Questions</div>
                </div>
                <div className="text-center p-6 bg-success/10 rounded-lg">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-success" />
                  <div className="text-3xl font-bold text-success">{score.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct Answers</div>
                </div>
                <div className="text-center p-6 bg-destructive/10 rounded-lg">
                  <XCircle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                  <div className="text-3xl font-bold text-destructive">{score.total - score.correct}</div>
                  <div className="text-sm text-muted-foreground">Incorrect Answers</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Your Score</span>
                  <span className={`text-4xl font-bold ${getScoreColor()}`}>
                    {score.percentage}%
                  </span>
                </div>
                <Progress value={score.percentage} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={() => navigate("/")} variant="outline" size="lg">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <Button
              onClick={() => navigate("/mock-test")}
              className="bg-gradient-primary hover:opacity-90"
              size="lg"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Take Another Test
            </Button>
          </div>

          {/* Review Questions */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Review Your Answers</h2>
            <div className="space-y-6">
              {questions.map((question, index) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  questionNumber={index + 1}
                  totalQuestions={questions.length}
                  onAnswer={() => {}}
                  selectedAnswer={answers[question.id] || ""}
                  showResult={true}
                  isReview={true}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;
