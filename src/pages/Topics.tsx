
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calculator, 
  Binary, 
  Sigma, 
  CircleDot, 
  Divide, 
  ArrowRight
} from 'lucide-react';
import MathDisplay from '@/components/math/MathDisplay';

const Topics = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Math Topics</h1>
          <p className="text-muted-foreground">
            Explore formulas and concepts across various mathematics topics
          </p>
        </div>
        
        <Tabs defaultValue="algebra" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="algebra" className="flex items-center space-x-2">
              <Binary className="h-4 w-4" />
              <span>Algebra</span>
            </TabsTrigger>
            <TabsTrigger value="calculus" className="flex items-center space-x-2">
              <Sigma className="h-4 w-4" />
              <span>Calculus</span>
            </TabsTrigger>
            <TabsTrigger value="geometry" className="flex items-center space-x-2">
              <CircleDot className="h-4 w-4" />
              <span>Geometry</span>
            </TabsTrigger>
            <TabsTrigger value="trigonometry" className="flex items-center space-x-2">
              <ArrowRight className="h-4 w-4" />
              <span>Trigonometry</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center space-x-2">
              <Divide className="h-4 w-4" />
              <span>Statistics</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="algebra" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Linear Equations</CardTitle>
                  <CardDescription>
                    Equations of the form ax + b = c
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="ax + b = c" />
                    <MathDisplay math="x = \frac{c - b}{a}" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A linear equation is an equation with variables that only appear with a power of 1. 
                    To solve, isolate the variable on one side.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quadratic Equations</CardTitle>
                  <CardDescription>
                    Equations of the form ax² + bx + c = 0
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="ax^2 + bx + c = 0" />
                    <MathDisplay math="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The quadratic formula provides the solutions to a quadratic equation. 
                    The discriminant (b² - 4ac) determines the number and type of solutions.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Systems of Equations</CardTitle>
                  <CardDescription>
                    Multiple equations with multiple unknowns
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\begin{cases} a_1x + b_1y = c_1 \\ a_2x + b_2y = c_2 \end{cases}" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Systems can be solved using substitution, elimination, or matrices.
                    For a 2×2 system, the solution is:
                  </p>
                  <div className="formula-block">
                    <MathDisplay math="x = \frac{c_1b_2 - c_2b_1}{a_1b_2 - a_2b_1}, \quad y = \frac{a_1c_2 - a_2c_1}{a_1b_2 - a_2b_1}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Polynomials</CardTitle>
                  <CardDescription>
                    Expressions with variables raised to whole number powers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="P(x) = a_nx^n + a_{n-1}x^{n-1} + \ldots + a_1x + a_0" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    A polynomial of degree n has at most n real roots. 
                    For polynomials with real coefficients, complex roots come in conjugate pairs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="calculus" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Derivatives</CardTitle>
                  <CardDescription>
                    Rate of change of a function
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Common derivative rules:
                  </p>
                  <div className="formula-block">
                    <MathDisplay math="\frac{d}{dx}[x^n] = nx^{n-1}" />
                    <MathDisplay math="\frac{d}{dx}[\sin(x)] = \cos(x)" />
                    <MathDisplay math="\frac{d}{dx}[\cos(x)] = -\sin(x)" />
                    <MathDisplay math="\frac{d}{dx}[e^x] = e^x" />
                    <MathDisplay math="\frac{d}{dx}[\ln(x)] = \frac{1}{x}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Integrals</CardTitle>
                  <CardDescription>
                    Accumulation of quantities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\int f(x) \, dx = F(x) + C" />
                    <MathDisplay math="\int_a^b f(x) \, dx = F(b) - F(a)" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Common integration rules:
                  </p>
                  <div className="formula-block">
                    <MathDisplay math="\int x^n \, dx = \frac{x^{n+1}}{n+1} + C \quad (n \neq -1)" />
                    <MathDisplay math="\int \sin(x) \, dx = -\cos(x) + C" />
                    <MathDisplay math="\int \cos(x) \, dx = \sin(x) + C" />
                    <MathDisplay math="\int e^x \, dx = e^x + C" />
                    <MathDisplay math="\int \frac{1}{x} \, dx = \ln|x| + C" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Limits</CardTitle>
                  <CardDescription>
                    Value a function approaches
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\lim_{x \to a} f(x) = L" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Important limits:
                  </p>
                  <div className="formula-block">
                    <MathDisplay math="\lim_{x \to 0} \frac{\sin(x)}{x} = 1" />
                    <MathDisplay math="\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n = e" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sequences & Series</CardTitle>
                  <CardDescription>
                    Sums of ordered terms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\sum_{i=1}^{n} a_i = a_1 + a_2 + \ldots + a_n" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Common series:
                  </p>
                  <div className="formula-block">
                    <MathDisplay math="\sum_{i=1}^{n} i = \frac{n(n+1)}{2}" />
                    <MathDisplay math="\sum_{i=0}^{\infty} x^i = \frac{1}{1-x} \quad (|x| < 1)" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="geometry" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Areas</CardTitle>
                  <CardDescription>
                    Formulas for 2D shapes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\text{Rectangle: } A = lw" />
                    <MathDisplay math="\text{Triangle: } A = \frac{1}{2}bh" />
                    <MathDisplay math="\text{Circle: } A = \pi r^2" />
                    <MathDisplay math="\text{Trapezoid: } A = \frac{1}{2}(a+c)h" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Volumes</CardTitle>
                  <CardDescription>
                    Formulas for 3D shapes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\text{Cube: } V = s^3" />
                    <MathDisplay math="\text{Rectangular Prism: } V = lwh" />
                    <MathDisplay math="\text{Sphere: } V = \frac{4}{3}\pi r^3" />
                    <MathDisplay math="\text{Cylinder: } V = \pi r^2 h" />
                    <MathDisplay math="\text{Cone: } V = \frac{1}{3}\pi r^2 h" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Coordinate Geometry</CardTitle>
                  <CardDescription>
                    Points and lines in the plane
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\text{Distance: } d = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}" />
                    <MathDisplay math="\text{Midpoint: } M = \left(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2}\right)" />
                    <MathDisplay math="\text{Slope: } m = \frac{y_2 - y_1}{x_2 - x_1}" />
                    <MathDisplay math="\text{Line Equation: } y = mx + b" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Triangles</CardTitle>
                  <CardDescription>
                    Properties and theorems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\text{Pythagorean Theorem: } a^2 + b^2 = c^2" />
                    <MathDisplay math="\text{Law of Sines: } \frac{\sin A}{a} = \frac{\sin B}{b} = \frac{\sin C}{c}" />
                    <MathDisplay math="\text{Law of Cosines: } c^2 = a^2 + b^2 - 2ab\cos C" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trigonometry" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Definitions</CardTitle>
                  <CardDescription>
                    Primary trigonometric functions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\sin \theta = \frac{\text{opposite}}{\text{hypotenuse}}" />
                    <MathDisplay math="\cos \theta = \frac{\text{adjacent}}{\text{hypotenuse}}" />
                    <MathDisplay math="\tan \theta = \frac{\sin \theta}{\cos \theta} = \frac{\text{opposite}}{\text{adjacent}}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Identities</CardTitle>
                  <CardDescription>
                    Important trigonometric relationships
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\sin^2 \theta + \cos^2 \theta = 1" />
                    <MathDisplay math="\sin(A + B) = \sin A \cos B + \cos A \sin B" />
                    <MathDisplay math="\cos(A + B) = \cos A \cos B - \sin A \sin B" />
                    <MathDisplay math="\sin 2\theta = 2\sin \theta \cos \theta" />
                    <MathDisplay math="\cos 2\theta = \cos^2 \theta - \sin^2 \theta" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Special Angles</CardTitle>
                  <CardDescription>
                    Values at common angles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\sin 0° = 0, \quad \cos 0° = 1, \quad \tan 0° = 0" />
                    <MathDisplay math="\sin 30° = \frac{1}{2}, \quad \cos 30° = \frac{\sqrt{3}}{2}, \quad \tan 30° = \frac{1}{\sqrt{3}}" />
                    <MathDisplay math="\sin 45° = \frac{\sqrt{2}}{2}, \quad \cos 45° = \frac{\sqrt{2}}{2}, \quad \tan 45° = 1" />
                    <MathDisplay math="\sin 60° = \frac{\sqrt{3}}{2}, \quad \cos 60° = \frac{1}{2}, \quad \tan 60° = \sqrt{3}" />
                    <MathDisplay math="\sin 90° = 1, \quad \cos 90° = 0, \quad \tan 90° = \text{undefined}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Inverse Functions</CardTitle>
                  <CardDescription>
                    Arc functions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\sin^{-1}(\sin \theta) = \theta \quad \text{for} \quad -\frac{\pi}{2} \leq \theta \leq \frac{\pi}{2}" />
                    <MathDisplay math="\cos^{-1}(\cos \theta) = \theta \quad \text{for} \quad 0 \leq \theta \leq \pi" />
                    <MathDisplay math="\tan^{-1}(\tan \theta) = \theta \quad \text{for} \quad -\frac{\pi}{2} < \theta < \frac{\pi}{2}" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="statistics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Descriptive Statistics</CardTitle>
                  <CardDescription>
                    Measures of central tendency and dispersion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\text{Mean: } \bar{x} = \frac{1}{n}\sum_{i=1}^{n}x_i" />
                    <MathDisplay math="\text{Variance: } \sigma^2 = \frac{1}{n}\sum_{i=1}^{n}(x_i - \bar{x})^2" />
                    <MathDisplay math="\text{Standard Deviation: } \sigma = \sqrt{\sigma^2}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Probability</CardTitle>
                  <CardDescription>
                    Basic probability concepts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="P(A) = \frac{\text{Number of favorable outcomes}}{\text{Total number of possible outcomes}}" />
                    <MathDisplay math="P(A \cup B) = P(A) + P(B) - P(A \cap B)" />
                    <MathDisplay math="P(A \cap B) = P(A) \cdot P(B) \quad \text{(if independent)}" />
                    <MathDisplay math="P(A | B) = \frac{P(A \cap B)}{P(B)}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Distributions</CardTitle>
                  <CardDescription>
                    Common probability distributions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="\text{Binomial: } P(X = k) = \binom{n}{k}p^k(1-p)^{n-k}" />
                    <MathDisplay math="\text{Normal: } f(x) = \frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Hypothesis Testing</CardTitle>
                  <CardDescription>
                    Statistical inference
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="formula-block">
                    <MathDisplay math="z = \frac{\bar{x} - \mu}{\sigma/\sqrt{n}}" />
                    <MathDisplay math="t = \frac{\bar{x} - \mu}{s/\sqrt{n}}" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default Topics;
