import { Link } from "react-router-dom";
import { categories } from "@/data/questions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, MessageSquare, Code, FileText, Calculator, BookOpen, Sparkles, Target, Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";

const categoryIcons: Record<string, any> = {
  "Reasoning Ability": Brain,
  "Verbal Ability": MessageSquare,
  "Technical Ability": Code,
  "Pseudocode": FileText,
  "Numerical Puzzles": Calculator,
  "English Grammar": BookOpen,
};

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Ace Your Infosys Exam</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Master Every Topic
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Practice with curated questions, take mock tests, and track your progress to excel in your Infosys recruitment exam.
          </p>
          <Link to="/mock-test">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-elevated">
              <Trophy className="w-5 h-5 mr-2" />
              Start Full Mock Test
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <Target className="w-10 h-10 text-primary mb-2" />
              <CardTitle>Targeted Practice</CardTitle>
              <CardDescription>
                Focus on specific categories to strengthen your weak areas
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <Brain className="w-10 h-10 text-secondary mb-2" />
              <CardTitle>Smart Hints</CardTitle>
              <CardDescription>
                Get helpful hints and detailed explanations for every question
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="shadow-card hover:shadow-elevated transition-shadow">
            <CardHeader>
              <Trophy className="w-10 h-10 text-accent mb-2" />
              <CardTitle>Mock Tests</CardTitle>
              <CardDescription>
                Simulate real exam conditions with timed full-length tests
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2 text-center">
            Practice by Category
          </h2>
          <p className="text-muted-foreground text-center mb-8">
            Choose a category to start practicing
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category] || BookOpen;
              return (
                <Link key={category} to={`/practice/${encodeURIComponent(category)}`}>
                  <Card className="h-full hover:shadow-elevated transition-all hover:scale-105 cursor-pointer shadow-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </div>
                      <CardDescription className="mt-2">
                        Practice questions to improve your {category.toLowerCase()} skills
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
