
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, ArrowUp, Bot, User, Lightbulb, BookOpen } from 'lucide-react';
import MathDisplay from '../math/MathDisplay';
import { solveMathProblem } from '@/services/mathSolver';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI Math Tutor. Ask me any math question and I'll help explain the concepts and solutions to you.",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Process the math problem if it looks like one
      let aiResponseContent = '';
      
      // Look for common math problem patterns
      const userInput = inputMessage.toLowerCase();
      
      const isEquation = userInput.includes('=') || 
                          userInput.includes('+') || 
                          userInput.includes('-') || 
                          userInput.includes('*') || 
                          userInput.includes('/') ||
                          userInput.includes('^');
      
      const isCalculus = userInput.includes('derivative') || 
                          userInput.includes('integral') || 
                          userInput.includes('integrate');
      
      const isTrig = userInput.includes('sin') || 
                      userInput.includes('cos') || 
                      userInput.includes('tan');
      
      const isStats = userInput.includes('mean') || 
                      userInput.includes('median') || 
                      userInput.includes('variance');
      
      const isGeometry = userInput.includes('area') || 
                          userInput.includes('perimeter') || 
                          userInput.includes('volume');
      
      let category = 'algebra';
      if (isCalculus) category = 'calculus';
      if (isTrig) category = 'trigonometry';
      if (isStats) category = 'statistics';
      if (isGeometry) category = 'geometry';
      
      if (isEquation || isCalculus || isTrig || isStats || isGeometry) {
        // Try to solve the problem
        try {
          const solution = solveMathProblem(inputMessage, category);
          
          // Create a detailed response
          aiResponseContent = `I'll solve this step-by-step:\n\n`;
          
          // Add each step with explanations
          solution.steps.forEach((step, index) => {
            aiResponseContent += `**Step ${index + 1}**: ${step.explanation}\n`;
            aiResponseContent += `$${step.math}$\n\n`;
          });
          
          // Add final result
          aiResponseContent += `**Final Result**: $${solution.result}$\n\n`;
          
          // Add additional explanation if it's a common problem type
          if (inputMessage.includes('derivative')) {
            aiResponseContent += `To find the derivative, we apply the following rules:\n`;
            aiResponseContent += `- Power Rule: The derivative of $x^n$ is $n·x^{n-1}$\n`;
            aiResponseContent += `- Sum Rule: The derivative of $f(x) + g(x)$ is $f'(x) + g'(x)$\n`;
            aiResponseContent += `- Product Rule: The derivative of $f(x)·g(x)$ is $f'(x)·g(x) + f(x)·g'(x)$\n`;
          } else if (inputMessage.includes('integrate')) {
            aiResponseContent += `For integration, we apply these rules:\n`;
            aiResponseContent += `- Power Rule for Integration: $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (where $n \\neq -1$)\n`;
            aiResponseContent += `- Sum Rule: $\\int [f(x) + g(x)] dx = \\int f(x) dx + \\int g(x) dx$\n`;
          } else if (inputMessage.includes('quadratic') || inputMessage.includes('x^2')) {
            aiResponseContent += `For quadratic equations of the form $ax^2 + bx + c = 0$, we use the quadratic formula:\n`;
            aiResponseContent += `$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\n`;
            aiResponseContent += `The discriminant $b^2 - 4ac$ tells us about the nature of the roots:\n`;
            aiResponseContent += `- If $b^2 - 4ac > 0$: Two distinct real roots\n`;
            aiResponseContent += `- If $b^2 - 4ac = 0$: One repeated real root\n`;
            aiResponseContent += `- If $b^2 - 4ac < 0$: Two complex conjugate roots\n`;
          }
        } catch (error) {
          console.error('Error solving problem:', error);
          aiResponseContent = "I'm having trouble solving this specific problem. Could you please check the format or try a different approach?";
        }
      } else {
        // Handle conceptual math questions
        if (userInput.includes('what is') || userInput.includes('explain') || userInput.includes('how to')) {
          if (userInput.includes('derivative')) {
            aiResponseContent = "The derivative measures the rate of change of a function with respect to a variable. Conceptually, it's the slope of the tangent line to the function at any given point.\n\n" +
              "Key derivative rules:\n" +
              "1. $\\frac{d}{dx}(x^n) = n·x^{n-1}$ (Power Rule)\n" +
              "2. $\\frac{d}{dx}(e^x) = e^x$ (Exponential)\n" +
              "3. $\\frac{d}{dx}(\\ln(x)) = \\frac{1}{x}$ (Natural Log)\n" +
              "4. $\\frac{d}{dx}(\\sin(x)) = \\cos(x)$ (Sine)\n" +
              "5. $\\frac{d}{dx}(\\cos(x)) = -\\sin(x)$ (Cosine)\n\n" +
              "Would you like me to solve a specific derivative problem?";
          } else if (userInput.includes('integral') || userInput.includes('integration')) {
            aiResponseContent = "Integration is the reverse of differentiation. It finds the function whose derivative is the integrand.\n\n" +
              "Key integration concepts:\n" +
              "1. Indefinite integrals: $\\int f(x) dx = F(x) + C$ where $F'(x) = f(x)$\n" +
              "2. Definite integrals: $\\int_{a}^{b} f(x) dx = F(b) - F(a)$ (Fundamental Theorem of Calculus)\n\n" +
              "Common integration rules:\n" +
              "- $\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (where $n \\neq -1$)\n" +
              "- $\\int e^x dx = e^x + C$\n" +
              "- $\\int \\frac{1}{x} dx = \\ln|x| + C$\n" +
              "- $\\int \\sin(x) dx = -\\cos(x) + C$\n" +
              "- $\\int \\cos(x) dx = \\sin(x) + C$\n\n" +
              "Would you like me to walk through a specific integration example?";
          } else if (userInput.includes('quadratic')) {
            aiResponseContent = "A quadratic equation has the form $ax^2 + bx + c = 0$ where $a \\neq 0$.\n\n" +
              "There are several ways to solve quadratic equations:\n\n" +
              "1. **Factoring**: If the equation can be written as $(x-r)(x-s) = 0$, then $x = r$ or $x = s$\n\n" +
              "2. **Completing the square**: Rearrange to $(x + \\frac{b}{2a})^2 = \\frac{b^2 - 4ac}{4a^2}$\n\n" +
              "3. **Quadratic formula**: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\n" +
              "The discriminant $b^2 - 4ac$ tells us about the solutions:\n" +
              "- If $b^2 - 4ac > 0$: Two distinct real solutions\n" +
              "- If $b^2 - 4ac = 0$: One repeated real solution\n" +
              "- If $b^2 - 4ac < 0$: Two complex conjugate solutions\n\n" +
              "Would you like me to solve a specific quadratic equation?";
          } else if (userInput.includes('pythagorean')) {
            aiResponseContent = "The Pythagorean Theorem states that in a right triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.\n\n" +
              "If $a$ and $b$ are the legs (the sides forming the right angle) and $c$ is the hypotenuse, then:\n\n" +
              "$a^2 + b^2 = c^2$\n\n" +
              "This theorem is fundamental in geometry and has many applications in fields like physics, engineering, and navigation.\n\n" +
              "Would you like to see how to use this theorem to solve a problem?";
          } else {
            aiResponseContent = "I'd be happy to help with your math question. Could you please provide more details or specify which mathematical concept you'd like me to explain? I can help with algebra, calculus, trigonometry, statistics, geometry, and many other topics.";
          }
        } else {
          aiResponseContent = "I'd be happy to help with your math question. Could you please provide more details or specify which mathematical concept you'd like me to explore? I can help with algebra, calculus, trigonometry, statistics, geometry, and many other topics.";
        }
      }
      
      // Create AI response message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error while processing your request. Please try again or rephrase your question.",
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Function to render message content with LaTeX support
  const renderMessageContent = (content: string) => {
    // Split by markdown-style bold markers
    const boldSplit = content.split(/(\*\*.*?\*\*)/);

    return boldSplit.map((part, boldIndex) => {
      // Check if this part is bold text
      if (part.startsWith('**') && part.endsWith('**')) {
        // Extract the text between the asterisks
        const boldText = part.slice(2, -2);
        return <strong key={`bold-${boldIndex}`}>{boldText}</strong>;
      }
      
      // For non-bold text, process for math expressions
      const mathParts = part.split(/(\$.*?\$)/);
      return mathParts.map((mathPart, mathIndex) => {
        if (mathPart.startsWith('$') && mathPart.endsWith('$')) {
          // Extract math expression
          const math = mathPart.slice(1, -1);
          return <MathDisplay key={`${boldIndex}-math-${mathIndex}`} math={math} inline />;
        }
        // Split text by newlines to maintain line breaks
        return mathPart.split('\n').map((line, lineIndex) => (
          <span key={`${boldIndex}-${mathIndex}-${lineIndex}`}>
            {line}
            {lineIndex < mathPart.split('\n').length - 1 && <br />}
          </span>
        ));
      });
    });
  };

  return (
    <Card className="flex flex-col h-[600px] overflow-hidden shadow-md">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-5 w-5" />
          AI Math Tutor
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`flex max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                } rounded-lg p-3`}
              >
                <div className="mr-2 mt-0.5">
                  {message.sender === 'user' ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="prose prose-sm">
                    {renderMessageContent(message.content)}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5" />
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <div className="h-2 w-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t p-3">
        <div className="w-full space-y-2">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
            <Lightbulb className="h-3 w-3" />
            <span>Tip: Try asking about derivatives, integrals, or specific math concepts</span>
          </div>
          
          <div className="flex space-x-2">
            <Textarea
              placeholder="Ask a math question..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow resize-none"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="self-end"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("How do I solve quadratic equations?")}>
              <BookOpen className="h-3 w-3 mr-1" /> Quadratic equations
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("Explain the chain rule for derivatives")}>
              <BookOpen className="h-3 w-3 mr-1" /> Chain rule
            </Button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => setInputMessage("How do I find the integral of sin(x)?")}>
              <BookOpen className="h-3 w-3 mr-1" /> Integration
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatBox;
