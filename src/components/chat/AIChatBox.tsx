
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, ArrowUp, Bot, User, Lightbulb, BookOpen } from 'lucide-react';
import MathDisplay from '../math/MathDisplay';

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
      // Simulate AI response - in a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Sample responses based on user input - in a real app, this would be from an API
      let aiResponseContent = "I'm sorry, I don't understand that question. Could you please rephrase or provide more details?";
      
      if (inputMessage.toLowerCase().includes('derivative')) {
        aiResponseContent = "When finding a derivative, remember that:\n\n" +
          "1. The derivative of $x^n$ is $n \\cdot x^{n-1}$\n" +
          "2. The derivative of $\\sin(x)$ is $\\cos(x)$\n" +
          "3. For a function $f(x) = u(x) \\cdot v(x)$, the derivative is $f'(x) = u'(x) \\cdot v(x) + u(x) \\cdot v'(x)$ (product rule)\n\n" +
          "Let me know if you'd like me to walk through a specific example!";
      } else if (inputMessage.toLowerCase().includes('integral')) {
        aiResponseContent = "For integration, remember these key rules:\n\n" +
          "1. The integral of $x^n$ is $\\frac{x^{n+1}}{n+1} + C$ (where $n \\neq -1$)\n" +
          "2. The integral of $\\cos(x)$ is $\\sin(x) + C$\n" +
          "3. For definite integrals: $\\int_{a}^{b} f(x) dx = F(b) - F(a)$ where $F$ is the antiderivative of $f$\n\n" +
          "Would you like to see a step-by-step example of a specific integration problem?";
      } else if (inputMessage.toLowerCase().includes('quadratic')) {
        aiResponseContent = "For quadratic equations $ax^2 + bx + c = 0$, you can use the quadratic formula:\n\n" +
          "$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$\n\n" +
          "The discriminant $b^2 - 4ac$ tells you about the solutions:\n" +
          "- If $b^2 - 4ac > 0$, there are two real solutions\n" +
          "- If $b^2 - 4ac = 0$, there is one real solution (a repeated root)\n" +
          "- If $b^2 - 4ac < 0$, there are two complex solutions\n\n" +
          "Would you like me to solve a specific quadratic equation for you?";
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponseContent,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
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
    // Simple regex to detect math expressions between $ symbols
    const parts = content.split(/(\$.*?\$)/);
    return parts.map((part, index) => {
      if (part.startsWith('$') && part.endsWith('$')) {
        // Extract the math expression without the $ symbols
        const math = part.slice(1, -1);
        return <MathDisplay key={index} math={math} inline />;
      }
      // Split text by newlines to maintain line breaks
      return part.split('\n').map((line, lineIndex) => (
        <span key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < part.split('\n').length - 1 && <br />}
        </span>
      ));
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
