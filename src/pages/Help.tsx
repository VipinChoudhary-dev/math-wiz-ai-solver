
import AppLayout from '@/components/layout/AppLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calculator, BookOpen, MessageCircle, Camera, HelpCircle } from 'lucide-react';

const Help = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Help Center</h1>
          <p className="text-muted-foreground">
            Learn how to use MathWiz AI Solver effectively
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-primary" />
                Problem Solver
              </CardTitle>
              <CardDescription>
                Solve math problems step-by-step
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Enter any math problem and get a detailed solution with explanations for each step.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-primary" />
                Math Topics
              </CardTitle>
              <CardDescription>
                Browse formulas and concepts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explore important formulas and concepts organized by math topics.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                AI Math Tutor
              </CardTitle>
              <CardDescription>
                Chat with our AI tutor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ask questions and get personalized explanations from our AI math tutor.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Camera className="mr-2 h-5 w-5 text-primary" />
                Image Upload
              </CardTitle>
              <CardDescription>
                Upload photos of equations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Coming soon: Upload images of handwritten equations to solve them.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="mr-2 h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
            <CardDescription>
              Find answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What types of math problems can I solve?</AccordionTrigger>
                <AccordionContent>
                  MathWiz can solve a wide range of math problems including algebra (linear and quadratic equations), 
                  calculus (derivatives and integrals), trigonometry, statistics, and geometry. Just enter your problem 
                  in the input field on the home page and select the appropriate category.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger>How accurate are the solutions?</AccordionTrigger>
                <AccordionContent>
                  We strive to provide accurate solutions to math problems. However, for complex problems or edge cases, 
                  there might be limitations. We recommend verifying critical results. If you find any inaccuracies, 
                  please let us know via the feedback form.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I input complex equations?</AccordionTrigger>
                <AccordionContent>
                  For basic operations, use standard keyboard symbols (+, -, *, /, ^). For more complex expressions:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Powers: Use ^ (e.g., x^2 for x²)</li>
                    <li>Square roots: Use sqrt() (e.g., sqrt(x) for √x)</li>
                    <li>Trigonometric functions: Use sin(), cos(), tan()</li>
                    <li>Logarithms: Use log() for base 10, ln() for natural log</li>
                    <li>Derivatives: Use derivative(expression)</li>
                    <li>Integrals: Use integrate(expression)</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I save my solved problems?</AccordionTrigger>
                <AccordionContent>
                  This feature is coming soon! In a future update, you'll be able to create an account 
                  and save your solved problems for future reference.
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger>How does the AI Math Tutor work?</AccordionTrigger>
                <AccordionContent>
                  The AI Math Tutor uses natural language processing to understand your questions about 
                  math concepts and problems. It can explain concepts, provide examples, and guide you through 
                  solving problems step-by-step. Just ask your question as you would to a human tutor.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Input Examples</CardTitle>
            <CardDescription>How to format different types of math problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Algebra</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><code className="bg-muted px-1 py-0.5 rounded">2x + 3 = 7</code> - Linear equation</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">x^2 - 9 = 0</code> - Quadratic equation</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">x^3 - 3x^2 + 2x - 5</code> - Polynomial</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Calculus</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><code className="bg-muted px-1 py-0.5 rounded">derivative(x^2 + 3x)</code> - Find the derivative</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">integrate(x^2)</code> - Find the indefinite integral</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">limit(sin(x)/x, x, 0)</code> - Find the limit as x approaches 0</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Trigonometry</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><code className="bg-muted px-1 py-0.5 rounded">sin(x)^2 + cos(x)^2</code> - Verify identity</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">sin(2x)</code> - Evaluate expression</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Statistics</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><code className="bg-muted px-1 py-0.5 rounded">mean 1, 2, 3, 4, 5</code> - Calculate the mean</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">variance 1, 2, 3, 4, 5</code> - Calculate the variance</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Geometry</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><code className="bg-muted px-1 py-0.5 rounded">area of circle radius 5</code> - Calculate the area</li>
                  <li><code className="bg-muted px-1 py-0.5 rounded">perimeter of rectangle length 4 width 6</code> - Calculate the perimeter</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Help;
