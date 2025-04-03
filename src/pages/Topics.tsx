
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Calculator, 
  Code,
  Binary,
  Sigma,
  Square
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Topics = () => {
  const mathTopics = [
    {
      title: 'Algebra',
      description: 'Learn about equations, inequalities, functions, and more',
      icon: <Binary className="h-5 w-5" />,
      examples: [
        'Linear Equations',
        'Quadratic Equations',
        'Polynomials',
        'Systems of Equations'
      ]
    },
    {
      title: 'Calculus',
      description: 'Explore derivatives, integrals, limits, and series',
      icon: <Sigma className="h-5 w-5" />,
      examples: [
        'Limits and Continuity',
        'Differentiation',
        'Integration',
        'Series and Sequences'
      ]
    },
    {
      title: 'Geometry',
      description: 'Study shapes, sizes, positions, and dimensions',
      icon: <Square className="h-5 w-5" />,
      examples: [
        'Euclidean Geometry',
        'Coordinate Geometry',
        'Transformations',
        'Vectors'
      ]
    },
    {
      title: 'Trigonometry',
      description: 'Understand the relationships between angles and sides',
      icon: <Calculator className="h-5 w-5" />,
      examples: [
        'Trigonometric Ratios',
        'Identities',
        'Equations',
        'Functions'
      ]
    },
    {
      title: 'Statistics',
      description: 'Analyze data, probability, and statistical methods',
      icon: <Code className="h-5 w-5" />,
      examples: [
        'Descriptive Statistics',
        'Probability Distributions',
        'Hypothesis Testing',
        'Regression Analysis'
      ]
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Math Topics</h1>
          <p className="text-muted-foreground">
            Explore different areas of mathematics and learn key concepts
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mathTopics.map((topic, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{topic.title}</CardTitle>
                  <div className="p-2 bg-primary/10 rounded-full">
                    {topic.icon}
                  </div>
                </div>
                <CardDescription>{topic.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {topic.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2"></span>
                      {example}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  asChild
                >
                  <Link to="/chat">
                    Ask about {topic.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Topics;
