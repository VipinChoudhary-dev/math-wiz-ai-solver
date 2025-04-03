
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  ArrowRight, 
  Camera,
  Function,
  Sigma,
  Divide,
  SquareRoot
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MathInputProps {
  onSolve: (equation: string, category: string) => void;
}

const MathInput = ({ onSolve }: MathInputProps) => {
  const [equation, setEquation] = useState('');
  const [category, setCategory] = useState('algebra');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (equation.trim()) {
      onSolve(equation, category);
    }
  };

  return (
    <Card className="w-full bg-background shadow-md">
      <CardContent className="pt-6">
        <Tabs defaultValue="input" className="w-full">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="input" className="w-full">
              <span className="flex items-center space-x-2">
                <Calculator className="h-4 w-4" />
                <span>Text Input</span>
              </span>
            </TabsTrigger>
            <TabsTrigger value="upload" className="w-full" disabled>
              <span className="flex items-center space-x-2">
                <Camera className="h-4 w-4" />
                <span>Upload Image</span>
              </span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="input">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label htmlFor="category" className="text-sm font-medium">
                  Select Math Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                  <Button
                    type="button"
                    variant={category === 'algebra' ? 'default' : 'outline'}
                    className="text-xs h-auto py-2"
                    onClick={() => setCategory('algebra')}
                  >
                    <Function className="mr-1 h-3 w-3" /> Algebra
                  </Button>
                  <Button
                    type="button"
                    variant={category === 'calculus' ? 'default' : 'outline'}
                    className="text-xs h-auto py-2"
                    onClick={() => setCategory('calculus')}
                  >
                    <Sigma className="mr-1 h-3 w-3" /> Calculus
                  </Button>
                  <Button
                    type="button"
                    variant={category === 'geometry' ? 'default' : 'outline'}
                    className="text-xs h-auto py-2"
                    onClick={() => setCategory('geometry')}
                  >
                    <SquareRoot className="mr-1 h-3 w-3" /> Geometry
                  </Button>
                  <Button
                    type="button"
                    variant={category === 'trigonometry' ? 'default' : 'outline'}
                    className="text-xs h-auto py-2"
                    onClick={() => setCategory('trigonometry')}
                  >
                    <span className="mr-1">sin</span> Trigonometry
                  </Button>
                  <Button
                    type="button"
                    variant={category === 'statistics' ? 'default' : 'outline'}
                    className="text-xs h-auto py-2 md:col-span-1"
                    onClick={() => setCategory('statistics')}
                  >
                    <Divide className="mr-1 h-3 w-3" /> Statistics
                  </Button>
                </div>
              </div>
              
              <div className="space-y-1">
                <label htmlFor="equation" className="text-sm font-medium">
                  Enter Your Math Problem
                </label>
                <div className="flex space-x-2">
                  <Input
                    id="equation"
                    className="font-mono"
                    placeholder="e.g., 2x + 3 = 15 or x^2 - 4 = 0"
                    value={equation}
                    onChange={(e) => setEquation(e.target.value)}
                  />
                  <Button type="submit" disabled={!equation.trim()}>
                    <ArrowRight className="mr-2 h-4 w-4" /> Solve
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground mt-2">
                  <p className="mb-1">Example inputs:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-mono">2x + 3 = 7</span> - Linear equation</li>
                    <li><span className="font-mono">x^2 - 9 = 0</span> - Quadratic equation</li>
                    <li><span className="font-mono">derivative(x^2 + 3x)</span> - Calculus</li>
                    <li><span className="font-mono">integrate(x^2)</span> - Integration</li>
                    <li><span className="font-mono">sin(x)^2 + cos(x)^2</span> - Trigonometric identity</li>
                  </ul>
                </div>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg p-12 text-center">
              <Camera className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">
                Upload an image of a handwritten equation
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                (Coming soon in future updates)
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MathInput;
