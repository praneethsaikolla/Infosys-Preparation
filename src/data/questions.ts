export interface Question {
  id: string;
  category: string;
  prompt: string;
  options: {
    id: string;
    text: string;
  }[];
  correct_options: string[];
  hint: string;
  explanation: string;
  difficulty: string;
}

export const questions: Question[] = [
  // Reasoning Ability
  {
    id: "r001",
    category: "Reasoning Ability",
    prompt: "All A are B. All B are C. Are all A C?",
    options: [
      { id: "a", text: "Yes" },
      { id: "b", text: "No" },
      { id: "c", text: "Cannot say" }
    ],
    correct_options: ["a"],
    hint: "Think about the relationship between A, B, and C.",
    explanation: "If all A are B and all B are C, then all A are C. This is a transitive property.",
    difficulty: "Medium"
  },
  {
    id: "r002",
    category: "Reasoning Ability",
    prompt: "If 'CODE' is written as 'DPEF', how is 'TEAM' written?",
    options: [
      { id: "a", text: "UFBN" },
      { id: "b", text: "UEBN" },
      { id: "c", text: "UEAN" }
    ],
    correct_options: ["a"],
    hint: "Look at how each letter shifts in the alphabet.",
    explanation: "Each letter is shifted by +1 in the alphabet. T→U, E→F, A→B, M→N = UFBN",
    difficulty: "Easy"
  },
  {
    id: "r003",
    category: "Reasoning Ability",
    prompt: "In a certain code, RAIN is written as 8$%6 and MORE is written as 7#8@. What is the code for MOAN?",
    options: [
      { id: "a", text: "7#$6" },
      { id: "b", text: "7#%6" },
      { id: "c", text: "7#$%" }
    ],
    correct_options: ["b"],
    hint: "Match each letter with its corresponding symbol from the given codes.",
    explanation: "M=7, O=#, A=%, N=6. Therefore MOAN = 7#%6",
    difficulty: "Medium"
  },
  {
    id: "r004",
    category: "Reasoning Ability",
    prompt: "Find the odd one out: 3, 7, 15, 27, 63",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "7" },
      { id: "c", text: "27" }
    ],
    correct_options: ["c"],
    hint: "Check which numbers are one less than a power of 2.",
    explanation: "3=2²-1, 7=2³-1, 15=2⁴-1, 63=2⁶-1. But 27 doesn't fit this pattern.",
    difficulty: "Hard"
  },

  // Verbal Ability
  {
    id: "v001",
    category: "Verbal Ability",
    prompt: "Choose the correct spelling:",
    options: [
      { id: "a", text: "Recieve" },
      { id: "b", text: "Receive" },
      { id: "c", text: "Receeve" }
    ],
    correct_options: ["b"],
    hint: "Remember the rule: 'i before e except after c'.",
    explanation: "'Receive' is correct according to the spelling rule.",
    difficulty: "Easy"
  },
  {
    id: "v002",
    category: "Verbal Ability",
    prompt: "Select the synonym for 'ABUNDANT':",
    options: [
      { id: "a", text: "Scarce" },
      { id: "b", text: "Plentiful" },
      { id: "c", text: "Limited" }
    ],
    correct_options: ["b"],
    hint: "Think of a word that means 'in large quantities'.",
    explanation: "Abundant means plentiful or in large quantities.",
    difficulty: "Easy"
  },
  {
    id: "v003",
    category: "Verbal Ability",
    prompt: "Choose the antonym for 'OPTIMISTIC':",
    options: [
      { id: "a", text: "Hopeful" },
      { id: "b", text: "Pessimistic" },
      { id: "c", text: "Cheerful" }
    ],
    correct_options: ["b"],
    hint: "Find the word with opposite meaning.",
    explanation: "Optimistic means hopeful; pessimistic means expecting the worst.",
    difficulty: "Easy"
  },
  {
    id: "v004",
    category: "Verbal Ability",
    prompt: "Fill in the blank: He was _____ by the sudden noise.",
    options: [
      { id: "a", text: "startled" },
      { id: "b", text: "starting" },
      { id: "c", text: "start" }
    ],
    correct_options: ["a"],
    hint: "The sentence needs a past participle form.",
    explanation: "The passive voice requires the past participle 'startled'.",
    difficulty: "Medium"
  },

  // Technical Ability
  {
    id: "t001",
    category: "Technical Ability",
    prompt: "What is the output of: print(2 ** 3)?",
    options: [
      { id: "a", text: "6" },
      { id: "b", text: "8" },
      { id: "c", text: "9" }
    ],
    correct_options: ["b"],
    hint: "** operator in Python performs exponentiation.",
    explanation: "2 ** 3 means 2 raised to power 3, which equals 8.",
    difficulty: "Easy"
  },
  {
    id: "t002",
    category: "Technical Ability",
    prompt: "Which data structure uses LIFO (Last In First Out)?",
    options: [
      { id: "a", text: "Queue" },
      { id: "b", text: "Stack" },
      { id: "c", text: "Array" }
    ],
    correct_options: ["b"],
    hint: "Think of a pile of plates - you take from the top.",
    explanation: "Stack follows LIFO principle where the last element added is the first to be removed.",
    difficulty: "Medium"
  },
  {
    id: "t003",
    category: "Technical Ability",
    prompt: "What does SQL stand for?",
    options: [
      { id: "a", text: "Structured Query Language" },
      { id: "b", text: "Simple Question Language" },
      { id: "c", text: "Standard Queue List" }
    ],
    correct_options: ["a"],
    hint: "It's used for database queries.",
    explanation: "SQL stands for Structured Query Language, used to manage relational databases.",
    difficulty: "Easy"
  },
  {
    id: "t004",
    category: "Technical Ability",
    prompt: "What is the time complexity of binary search?",
    options: [
      { id: "a", text: "O(n)" },
      { id: "b", text: "O(log n)" },
      { id: "c", text: "O(n²)" }
    ],
    correct_options: ["b"],
    hint: "Binary search divides the search space in half each time.",
    explanation: "Binary search has O(log n) time complexity as it halves the search space with each iteration.",
    difficulty: "Hard"
  },

  // Pseudocode
  {
    id: "p001",
    category: "Pseudocode",
    prompt: "What is the output? x = 5; y = 10; swap(x, y); print(x)",
    options: [
      { id: "a", text: "5" },
      { id: "b", text: "10" },
      { id: "c", text: "Error" }
    ],
    correct_options: ["b"],
    hint: "The swap function exchanges values of x and y.",
    explanation: "After swap, x contains y's value (10), so print(x) outputs 10.",
    difficulty: "Medium"
  },
  {
    id: "p002",
    category: "Pseudocode",
    prompt: "for i = 1 to 3: print(i * 2). What is printed?",
    options: [
      { id: "a", text: "2 4 6" },
      { id: "b", text: "1 2 3" },
      { id: "c", text: "3 6 9" }
    ],
    correct_options: ["a"],
    hint: "Multiply each iteration value by 2.",
    explanation: "Loop runs for i=1,2,3. Prints: 1*2=2, 2*2=4, 3*2=6.",
    difficulty: "Easy"
  },

  // Numerical Puzzles
  {
    id: "n001",
    category: "Numerical Puzzles",
    prompt: "What comes next in the series: 2, 6, 12, 20, ?",
    options: [
      { id: "a", text: "28" },
      { id: "b", text: "30" },
      { id: "c", text: "32" }
    ],
    correct_options: ["b"],
    hint: "Look at the differences between consecutive numbers.",
    explanation: "Differences are 4, 6, 8, 10... Next difference is 10, so 20+10=30.",
    difficulty: "Medium"
  },
  {
    id: "n002",
    category: "Numerical Puzzles",
    prompt: "If 3 workers can complete a task in 8 days, how many days will 6 workers take?",
    options: [
      { id: "a", text: "4 days" },
      { id: "b", text: "6 days" },
      { id: "c", text: "12 days" }
    ],
    correct_options: ["a"],
    hint: "More workers mean less time (inverse proportion).",
    explanation: "Workers and days are inversely proportional. 3×8 = 6×x, so x = 4 days.",
    difficulty: "Medium"
  },

  // English Grammar
  {
    id: "g001",
    category: "English Grammar",
    prompt: "Identify the error: 'She don't like coffee.'",
    options: [
      { id: "a", text: "Use 'doesn't' instead of 'don't'" },
      { id: "b", text: "Use 'didn't' instead of 'don't'" },
      { id: "c", text: "No error" }
    ],
    correct_options: ["a"],
    hint: "Check subject-verb agreement.",
    explanation: "For third person singular (she), use 'doesn't' not 'don't'.",
    difficulty: "Easy"
  },
  {
    id: "g002",
    category: "English Grammar",
    prompt: "Choose the correct form: 'If I _____ rich, I would travel the world.'",
    options: [
      { id: "a", text: "am" },
      { id: "b", text: "was" },
      { id: "c", text: "were" }
    ],
    correct_options: ["c"],
    hint: "This is a hypothetical condition (subjunctive mood).",
    explanation: "In hypothetical conditions, use 'were' for all persons (subjunctive).",
    difficulty: "Medium"
  }
];

export const categories = [
  "Reasoning Ability",
  "Verbal Ability",
  "Technical Ability",
  "Pseudocode",
  "Numerical Puzzles",
  "English Grammar"
];

export const getQuestionsByCategory = (category: string): Question[] => {
  return questions.filter(q => q.category === category);
};

export const getRandomQuestions = (count: number, selectedCategories?: string[]): Question[] => {
  let pool = questions;
  if (selectedCategories && selectedCategories.length > 0) {
    pool = questions.filter(q => selectedCategories.includes(q.category));
  }
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

export const calculateScore = (answers: Record<string, string | string[]>): {
  total: number;
  correct: number;
  percentage: number;
} => {
  let correct = 0;
  const total = Object.keys(answers).length;

  Object.entries(answers).forEach(([questionId, selectedAnswer]) => {
    const question = questions.find(q => q.id === questionId);
    if (question) {
      let isCorrect = false;
      
      if (typeof selectedAnswer === 'string') {
        // Single selection
        isCorrect = question.correct_options.length === 1 && 
                    question.correct_options.includes(selectedAnswer);
      } else {
        // Multiple selection
        isCorrect = 
          selectedAnswer.length === question.correct_options.length &&
          selectedAnswer.every(opt => question.correct_options.includes(opt));
      }
      
      if (isCorrect) correct++;
    }
  });

  return {
    total,
    correct,
    percentage: total > 0 ? Math.round((correct / total) * 100) : 0
  };
};
