
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import MathInput from '@/components/math/MathInput';
import SolutionDisplay from '@/components/math/SolutionDisplay';
import { solveMathProblem } from '@/services/mathSolver';
import { Button } from '@/components/ui/button';
import { ChevronDown, Calculator, BookOpen, MessageCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [problem, setProblem] = useState('');
  const [category, setCategory] = useState('');
  const [solution, setSolution] = useState<any>(null);
  
  const handleSolve = (equation: string, category: string) => {
    setProblem(equation);
    setCategory(category);
    const result = solveMathProblem(equation, category);
    setSolution(result);
  };

  const examples = [
    { problem: '2x + 3 = 7', category: 'algebra', label: 'Linear Equation' },
    { problem: 'x^2 - 9 = 0', category: 'algebra', label: 'Quadratic Equation' },
    { problem: 'derivative(x^2)', category: 'calculus', label: 'Derivative' },
    { problem: 'integrate(x^2)', category: 'calculus', label: 'Integral' },
    { problem: 'sin(x)^2 + cos(x)^2', category: 'trigonometry', label: 'Trig Identity' },
  ];

  return (
    <AppLayout>
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Advanced Mathematics Problem Solver
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get step-by-step solutions to algebra, calculus, trigonometry, statistics, and geometry problems.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button asChild variant="outline" className="group">
              <Link to="/" className="flex items-center">
                <Calculator className="mr-2 h-4 w-4 text-primary" />
                <span>Problem Solver</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="group">
              <Link to="/topics" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-primary" />
                <span>Math Topics</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="group">
              <Link to="/chat" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4 text-primary" />
                <span>AI Math Tutor</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <MathInput onSolve={handleSolve} />
          
          {!solution && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-center space-x-2 mt-12 mb-6 text-muted-foreground">
                <span className="h-px bg-muted flex-grow"></span>
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2" />
                  <span>Try an Example</span>
                </div>
                <span className="h-px bg-muted flex-grow"></span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {examples.map((example, index) => (
                  <Button 
                    key={index} 
                    variant="outline"
                    className="justify-start h-auto py-3"
                    onClick={() => handleSolve(example.problem, example.category)}
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs text-muted-foreground mb-1">{example.label}</span>
                      <span className="font-mono">{example.problem}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {solution && (
            <div className="mt-8">
              <SolutionDisplay 
                problem={problem}
                category={category}
                steps={solution.steps}
                result={solution.result}
                graphData={solution.graphData}
              />
              
              <div className="mt-8 text-center">
                <Button 
                  variant="outline" 
                  onClick={() => setSolution(null)}
                  className="animate-pulse-gentle"
                >
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Solve Another Problem
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
