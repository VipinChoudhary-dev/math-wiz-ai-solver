
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MathDisplay from './MathDisplay';
import MathGraph from './MathGraph';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, Info } from 'lucide-react';

interface Step {
  id: string;
  explanation: string;
  math: string;
}

interface SolutionDisplayProps {
  problem: string;
  category: string;
  steps: Step[];
  result: string;
  graphData?: {
    equation: string;
    domain: [number, number];
  };
}

const SolutionDisplay = ({ problem, category, steps, result, graphData }: SolutionDisplayProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <span className="capitalize">{category}</span> Solution
          </CardTitle>
          <CardDescription>
            Problem: <MathDisplay math={problem} inline />
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {graphData && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Graph</h3>
              <MathGraph equation={graphData.equation} domain={graphData.domain} />
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium mb-2">Step-by-Step Solution</h3>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id} className="solution-step animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-start">
                    <ChevronRight className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{step.explanation}</p>
                      <div className="formula-block">
                        <MathDisplay math={step.math} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2">Final Answer</h3>
            <div className="formula-block bg-primary/10 border border-primary/20">
              <MathDisplay math={result} />
            </div>
          </div>

          <div className="flex items-start bg-muted/50 p-3 rounded-lg mt-4">
            <Info className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">
              Note: This solution is provided for educational purposes. While we strive for accuracy, 
              we recommend verifying important results. If you spot an error or need clarification,
              try our AI Math Tutor for more help.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SolutionDisplay;
