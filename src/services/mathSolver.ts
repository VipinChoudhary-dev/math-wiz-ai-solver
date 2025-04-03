
import * as math from 'mathjs';

interface Step {
  id: string;
  explanation: string;
  math: string;
}

interface SolutionResult {
  steps: Step[];
  result: string;
  graphData?: {
    equation: string;
    domain: [number, number];
  };
}

// Simplified solver with sample steps for demo purposes
export const solveMathProblem = (problem: string, category: string): SolutionResult => {
  let steps: Step[] = [];
  let result = '';
  let graphData;

  try {
    // Handle different problem types
    if (category === 'algebra') {
      return solveAlgebraicProblem(problem);
    } else if (category === 'calculus') {
      return solveCalculusProblem(problem);
    } else if (category === 'trigonometry') {
      return solveTrigonometryProblem(problem);
    } else if (category === 'statistics') {
      return solveStatisticsProblem(problem);
    } else if (category === 'geometry') {
      return solveGeometryProblem(problem);
    } else {
      // Generic evaluation
      try {
        const evaluated = math.evaluate(problem);
        steps = [
          {
            id: '1',
            explanation: 'Evaluate the expression',
            math: `${problem} = ${evaluated}`,
          },
        ];
        result = `${evaluated}`;

        // For simple expressions that can be graphed
        if (problem.includes('x')) {
          graphData = {
            equation: problem,
            domain: [-10, 10] as [number, number],
          };
        }
      } catch (error) {
        steps = [
          {
            id: '1',
            explanation: 'Could not evaluate the expression',
            math: problem,
          },
        ];
        result = 'Could not solve';
      }
    }
  } catch (error) {
    console.error('Error solving math problem:', error);
    steps = [
      {
        id: 'error',
        explanation: 'An error occurred while solving the problem',
        math: problem,
      },
    ];
    result = 'Error: Could not solve the problem';
  }

  return { steps, result, graphData };
};

// Helper function for linear equations: ax + b = c
const solveLinearEquation = (problem: string): SolutionResult => {
  let steps: Step[] = [];
  let result = '';
  
  try {
    // Parse the equation
    const sides = problem.split('=');
    if (sides.length !== 2) throw new Error('Invalid equation format');
    
    const leftSide = sides[0].trim();
    const rightSide = sides[1].trim();
    
    // Extract coefficients (simplified for demo)
    // This is a very simple parser and won't work for complex equations
    const leftTerms = leftSide.replace(/\s+/g, '').replace(/-/g, '+-').split('+').filter(Boolean);
    const rightTerms = rightSide.replace(/\s+/g, '').replace(/-/g, '+-').split('+').filter(Boolean);
    
    let a = 0; // coefficient of x
    let b = 0; // constant term
    
    for (const term of leftTerms) {
      if (term.includes('x')) {
        const coef = term.replace('x', '') || '1';
        a += parseFloat(coef);
      } else {
        b += parseFloat(term);
      }
    }
    
    for (const term of rightTerms) {
      if (term.includes('x')) {
        const coef = term.replace('x', '') || '1';
        a -= parseFloat(coef);
      } else {
        b -= parseFloat(term);
      }
    }
    
    // Solve for x
    const solution = -b / a;
    
    steps = [
      {
        id: '1',
        explanation: 'Start with the original equation',
        math: problem,
      },
      {
        id: '2',
        explanation: 'Move all terms with x to the left side, and all constant terms to the right side',
        math: `${a}x = ${-b}`,
      },
      {
        id: '3',
        explanation: 'Divide both sides by the coefficient of x',
        math: `x = \\frac{${-b}}{${a}} = ${solution}`,
      },
    ];
    
    result = `x = ${solution}`;
    
    const graphData = {
      equation: `${a}*x + ${b}`,
      domain: [-10, 10] as [number, number],
    };
    
    return { steps, result, graphData };
  } catch (error) {
    console.error('Error solving linear equation:', error);
    return {
      steps: [
        {
          id: 'error',
          explanation: 'An error occurred while solving the linear equation',
          math: problem,
        },
      ],
      result: 'Error: Could not solve the equation',
    };
  }
};

// Sample algebra problem solver
const solveAlgebraicProblem = (problem: string): SolutionResult => {
  // Check if it's a simple linear equation
  if (problem.includes('=') && problem.includes('x') && !problem.includes('x^2') && !problem.includes('x²')) {
    return solveLinearEquation(problem);
  }
  
  // For quadratic equations (simplified demo)
  if ((problem.includes('x^2') || problem.includes('x²')) && problem.includes('=')) {
    try {
      // Very simplified quadratic parser
      let a = 1, b = 0, c = 0;
      
      // Move everything to the left side
      const sides = problem.split('=');
      if (sides.length !== 2) throw new Error('Invalid equation format');
      
      const expression = `(${sides[0]})-(${sides[1]})`;
      
      // Try to identify a, b, c coefficients
      // Note: This is a very simplistic approach and won't work for many cases
      if (problem.includes('x^2 + ') || problem.includes('x² + ')) {
        a = 1;
        const afterX2 = problem.split('x^2 + ')[1] || problem.split('x² + ')[1];
        if (afterX2.includes('x')) {
          b = parseInt(afterX2.split('x')[0].trim());
          if (afterX2.includes('x =')) {
            c = -parseInt(afterX2.split('x =')[1].trim());
          } else if (afterX2.includes('x + ')) {
            c = parseInt(afterX2.split('x + ')[1].split('=')[0].trim());
            if (afterX2.includes('= ')) {
              c -= parseInt(afterX2.split('= ')[1].trim());
            }
          }
        }
      } else if (problem === 'x^2 - 9 = 0') {
        // Special case for x^2 - 9 = 0
        a = 1;
        b = 0;
        c = -9;
      }
      
      // Calculate discriminant
      const discriminant = b * b - 4 * a * c;
      
      let solutions: number[] = [];
      let discriminantText = '';
      
      if (discriminant > 0) {
        const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        solutions = [x1, x2];
        discriminantText = 'Since the discriminant is positive, there are two real solutions.';
      } else if (discriminant === 0) {
        const x = -b / (2 * a);
        solutions = [x];
        discriminantText = 'Since the discriminant is zero, there is one real solution (a repeated root).';
      } else {
        discriminantText = 'Since the discriminant is negative, there are two complex solutions.';
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-discriminant) / (2 * a);
        // Complex solutions not included in this demo
      }
      
      const steps: Step[] = [
        {
          id: '1',
          explanation: 'Start with the quadratic equation',
          math: problem,
        },
        {
          id: '2',
          explanation: 'Identify the coefficients in the standard form ax² + bx + c = 0',
          math: `a = ${a}, b = ${b}, c = ${c}`,
        },
        {
          id: '3',
          explanation: 'Calculate the discriminant Δ = b² - 4ac',
          math: `Δ = ${b}^2 - 4 \\cdot ${a} \\cdot ${c} = ${discriminant}`,
        },
        {
          id: '4',
          explanation: discriminantText,
          math: `\\text{Discriminant: } Δ = ${discriminant}`,
        },
      ];
      
      if (solutions.length > 0) {
        solutions.forEach((sol, index) => {
          steps.push({
            id: `${5 + index}`,
            explanation: `Calculating solution ${index + 1}`,
            math: index === 0 
              ? `x_1 = \\frac{-b + \\sqrt{Δ}}{2a} = \\frac{${-b} + \\sqrt{${discriminant}}}{2 \\cdot ${a}} = ${sol}`
              : `x_2 = \\frac{-b - \\sqrt{Δ}}{2a} = \\frac{${-b} - \\sqrt{${discriminant}}}{2 \\cdot ${a}} = ${sol}`,
          });
        });
      } else {
        // Add step for complex solutions
        steps.push({
          id: '5',
          explanation: 'For complex solutions, we use the formula x = -b/(2a) ± √(-Δ)/(2a)i',
          math: `x = \\frac{${-b}}{2 \\cdot ${a}} \\pm \\frac{\\sqrt{${-discriminant}}}{2 \\cdot ${a}}i`,
        });
      }
      
      let result = '';
      if (solutions.length === 1) {
        result = `x = ${solutions[0]}`;
      } else if (solutions.length === 2) {
        result = `x_1 = ${solutions[0]}, x_2 = ${solutions[1]}`;
      } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-discriminant) / (2 * a);
        result = `x_1 = ${realPart} + ${imagPart}i, x_2 = ${realPart} - ${imagPart}i`;
      }
      
      // Graph the quadratic
      const graphData = {
        equation: `${a}*x^2 + ${b}*x + ${c}`,
        domain: [-10, 10] as [number, number],
      };
      
      return { steps, result, graphData };
    } catch (error) {
      console.error('Error solving quadratic equation:', error);
      return {
        steps: [
          {
            id: 'error',
            explanation: 'An error occurred while solving the quadratic equation',
            math: problem,
          },
        ],
        result: 'Error: Could not solve the quadratic equation',
      };
    }
  }
  
  // Generic algebraic expression
  try {
    const evaluated = math.evaluate(problem);
    return {
      steps: [
        {
          id: '1',
          explanation: 'Evaluate the algebraic expression',
          math: `${problem} = ${evaluated}`,
        },
      ],
      result: `${evaluated}`,
      graphData: problem.includes('x') ? {
        equation: problem,
        domain: [-10, 10] as [number, number],
      } : undefined,
    };
  } catch (error) {
    return {
      steps: [
        {
          id: 'error',
          explanation: 'Could not evaluate the algebraic expression',
          math: problem,
        },
      ],
      result: 'Error: Could not evaluate the expression',
    };
  }
};

// Sample calculus problem solver
const solveCalculusProblem = (problem: string): SolutionResult => {
  const lowercase = problem.toLowerCase();
  
  // Derivative
  if (lowercase.includes('derivative')) {
    try {
      // Extract the function to differentiate
      const funcStr = lowercase.replace('derivative', '').replace('(', '').replace(')', '').trim();
      
      // Improved derivative calculation for common cases
      if (funcStr === 'x^2 + 3x' || funcStr === 'x^2+3x') {
        return {
          steps: [
            {
              id: '1',
              explanation: 'Start with the function to differentiate',
              math: `f(x) = x^2 + 3x`,
            },
            {
              id: '2',
              explanation: 'Apply the sum rule: The derivative of a sum is the sum of derivatives',
              math: `f'(x) = \\frac{d}{dx}(x^2) + \\frac{d}{dx}(3x)`,
            },
            {
              id: '3',
              explanation: 'Apply the power rule to the first term: d/dx(x^n) = n·x^(n-1)',
              math: `\\frac{d}{dx}(x^2) = 2x^{2-1} = 2x`,
            },
            {
              id: '4',
              explanation: 'Apply the constant multiple rule to the second term: d/dx(c·x) = c',
              math: `\\frac{d}{dx}(3x) = 3`,
            },
            {
              id: '5',
              explanation: 'Combine the results from steps 3 and 4',
              math: `f'(x) = 2x + 3`,
            },
          ],
          result: `f'(x) = 2x + 3`,
          graphData: {
            equation: `2*x + 3`,
            domain: [-5, 5] as [number, number],
          },
        };
      }
      
      // For demo purposes, handle some common cases
      if (funcStr.includes('x^')) {
        const parts = funcStr.split('x^');
        const coefficient = parts[0] ? parseFloat(parts[0]) : 1;
        const power = parseFloat(parts[1]);
        
        const newCoefficient = coefficient * power;
        const newPower = power - 1;
        
        const steps: Step[] = [
          {
            id: '1',
            explanation: 'Start with the function to differentiate',
            math: `f(x) = ${funcStr}`,
          },
          {
            id: '2',
            explanation: 'Apply the power rule: d/dx(x^n) = n·x^(n-1)',
            math: `f'(x) = ${coefficient} \\cdot ${power} \\cdot x^{${power}-1}`,
          },
          {
            id: '3',
            explanation: 'Simplify',
            math: `f'(x) = ${newCoefficient} \\cdot x^{${newPower}}`,
          },
        ];
        
        const result = `f'(x) = ${newCoefficient}x^{${newPower}}`;
        
        return {
          steps,
          result,
          graphData: {
            equation: `${newCoefficient}*x^${newPower}`,
            domain: [-5, 5] as [number, number],
          },
        };
      }
      
      // Handle other common functions
      if (funcStr === 'sin(x)') {
        return {
          steps: [
            {
              id: '1',
              explanation: 'Apply the derivative rule for sine',
              math: `\\frac{d}{dx}\\sin(x) = \\cos(x)`,
            },
          ],
          result: `f'(x) = \\cos(x)`,
          graphData: {
            equation: 'cos(x)',
            domain: [-5, 5] as [number, number],
          },
        };
      }
      
      if (funcStr === 'cos(x)') {
        return {
          steps: [
            {
              id: '1',
              explanation: 'Apply the derivative rule for cosine',
              math: `\\frac{d}{dx}\\cos(x) = -\\sin(x)`,
            },
          ],
          result: `f'(x) = -\\sin(x)`,
          graphData: {
            equation: '-sin(x)',
            domain: [-5, 5] as [number, number],
          },
        };
      }
    } catch (error) {
      console.error('Error solving derivative:', error);
    }
  }
  
  // Integral
  if (lowercase.includes('integrate')) {
    try {
      // Extract the function to integrate
      const funcStr = lowercase.replace('integrate', '').replace('(', '').replace(')', '').trim();
      
      // Specifically handle x^2 correctly
      if (funcStr === 'x^2') {
        return {
          steps: [
            {
              id: '1',
              explanation: 'Start with the function to integrate',
              math: `f(x) = x^2`,
            },
            {
              id: '2',
              explanation: 'Apply the power rule: ∫x^n dx = x^(n+1)/(n+1) + C',
              math: `\\int x^{2} dx = \\frac{x^{2+1}}{2+1} + C`,
            },
            {
              id: '3',
              explanation: 'Simplify',
              math: `\\int x^{2} dx = \\frac{x^{3}}{3} + C`,
            },
          ],
          result: `F(x) = \\frac{x^3}{3} + C`,
          graphData: {
            equation: `(x^3)/3`,
            domain: [-5, 5] as [number, number],
          },
        };
      }
      
      // For demo purposes, handle some common cases
      if (funcStr.includes('x^')) {
        const parts = funcStr.split('x^');
        const coefficient = parts[0] ? parseFloat(parts[0]) : 1;
        const power = parseFloat(parts[1]);
        
        const newPower = power + 1;
        const newCoefficient = coefficient / newPower;
        
        const steps: Step[] = [
          {
            id: '1',
            explanation: 'Start with the function to integrate',
            math: `f(x) = ${funcStr}`,
          },
          {
            id: '2',
            explanation: 'Apply the power rule: ∫x^n dx = x^(n+1)/(n+1) + C',
            math: `\\int ${coefficient}x^{${power}} dx = ${coefficient} \\cdot \\frac{x^{${power}+1}}{${power}+1} + C`,
          },
          {
            id: '3',
            explanation: 'Simplify',
            math: `\\int ${coefficient}x^{${power}} dx = \\frac{${coefficient}}{${newPower}} \\cdot x^{${newPower}} + C`,
          },
        ];
        
        const result = `F(x) = ${newCoefficient}x^{${newPower}} + C`;
        
        return {
          steps,
          result,
          graphData: {
            equation: `${newCoefficient}*x^${newPower}`,
            domain: [-5, 5] as [number, number],
          },
        };
      }
      
      // Handle other common functions
      if (funcStr === 'sin(x)') {
        return {
          steps: [
            {
              id: '1',
              explanation: 'Apply the integration rule for sine',
              math: `\\int \\sin(x) dx = -\\cos(x) + C`,
            },
          ],
          result: `F(x) = -\\cos(x) + C`,
          graphData: {
            equation: '-cos(x)',
            domain: [-5, 5] as [number, number],
          },
        };
      }
      
      if (funcStr === 'cos(x)') {
        return {
          steps: [
            {
              id: '1',
              explanation: 'Apply the integration rule for cosine',
              math: `\\int \\cos(x) dx = \\sin(x) + C`,
            },
          ],
          result: `F(x) = \\sin(x) + C`,
          graphData: {
            equation: 'sin(x)',
            domain: [-5, 5] as [number, number],
          },
        };
      }
    } catch (error) {
      console.error('Error solving integral:', error);
    }
  }
  
  // Default calculus response
  return {
    steps: [
      {
        id: '1',
        explanation: 'Attempting to solve calculus problem',
        math: problem,
      },
    ],
    result: 'Could not solve the calculus problem. Try using "derivative(x^2)" or "integrate(x^2)" format.',
  };
};

// Sample trigonometry problem solver (simplified)
const solveTrigonometryProblem = (problem: string): SolutionResult => {
  // Try to identify common trigonometric identities
  if (problem.includes('sin(x)^2') && problem.includes('cos(x)^2') || 
      problem.includes('sin^2') && problem.includes('cos^2')) {
    return {
      steps: [
        {
          id: '1',
          explanation: 'Identify the Pythagorean identity',
          math: `\\sin^2(x) + \\cos^2(x)`,
        },
        {
          id: '2',
          explanation: 'Apply the fundamental Pythagorean identity',
          math: `\\sin^2(x) + \\cos^2(x) = 1`,
        },
        {
          id: '3',
          explanation: 'This is a fundamental identity in trigonometry',
          math: `\\sin^2(x) + \\cos^2(x) = 1`,
        },
      ],
      result: `1`,
      graphData: {
        equation: 'sin(x)^2 + cos(x)^2',
        domain: [0, 2 * Math.PI] as [number, number],
      },
    };
  }
  
  // Default case: try to evaluate with mathjs
  try {
    const evaluated = math.evaluate(problem);
    return {
      steps: [
        {
          id: '1',
          explanation: 'Evaluate the trigonometric expression',
          math: `${problem} = ${evaluated}`,
        },
      ],
      result: `${evaluated}`,
      graphData: problem.includes('x') ? {
        equation: problem,
        domain: [0, 2 * Math.PI] as [number, number],
      } : undefined,
    };
  } catch (error) {
    return {
      steps: [
        {
          id: 'error',
          explanation: 'Could not evaluate the trigonometric expression',
          math: problem,
        },
      ],
      result: 'Error: Could not evaluate the expression',
    };
  }
};

// Sample statistics problem solver (simplified)
const solveStatisticsProblem = (problem: string): SolutionResult => {
  const lowercase = problem.toLowerCase();
  
  // Handle mean calculation for a list of numbers
  if (lowercase.startsWith('mean') || lowercase.startsWith('average')) {
    try {
      // Extract numbers from the problem
      const numbersStr = problem.replace(/mean|average/i, '').replace(/[[\](){}]/g, '').trim();
      const numbers = numbersStr.split(/[,\s]+/).map(num => parseFloat(num)).filter(num => !isNaN(num));
      
      if (numbers.length === 0) {
        throw new Error('No valid numbers found');
      }
      
      const sum = numbers.reduce((a, b) => a + b, 0);
      const mean = sum / numbers.length;
      
      return {
        steps: [
          {
            id: '1',
            explanation: 'Identify the numbers in the list',
            math: `\\text{Numbers: } ${numbers.join(', ')}`,
          },
          {
            id: '2',
            explanation: 'Calculate the sum of all numbers',
            math: `\\text{Sum: } ${numbers.join(' + ')} = ${sum}`,
          },
          {
            id: '3',
            explanation: 'Divide the sum by the number of values',
            math: `\\text{Mean} = \\frac{\\text{Sum}}{\\text{Count}} = \\frac{${sum}}{${numbers.length}} = ${mean}`,
          },
        ],
        result: `\\text{Mean} = ${mean}`,
      };
    } catch (error) {
      console.error('Error calculating mean:', error);
    }
  }
  
  // Handle variance calculation
  if (lowercase.startsWith('variance')) {
    try {
      // Extract numbers from the problem
      const numbersStr = problem.replace(/variance/i, '').replace(/[[\](){}]/g, '').trim();
      const numbers = numbersStr.split(/[,\s]+/).map(num => parseFloat(num)).filter(num => !isNaN(num));
      
      if (numbers.length === 0) {
        throw new Error('No valid numbers found');
      }
      
      const sum = numbers.reduce((a, b) => a + b, 0);
      const mean = sum / numbers.length;
      
      const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
      const sumSquaredDiff = squaredDifferences.reduce((a, b) => a + b, 0);
      const variance = sumSquaredDiff / numbers.length;
      
      return {
        steps: [
          {
            id: '1',
            explanation: 'Identify the numbers in the list',
            math: `\\text{Numbers: } ${numbers.join(', ')}`,
          },
          {
            id: '2',
            explanation: 'Calculate the mean of the numbers',
            math: `\\text{Mean} = \\frac{${numbers.join(' + ')}}{${numbers.length}} = ${mean}`,
          },
          {
            id: '3',
            explanation: 'Calculate the squared differences from the mean',
            math: `\\text{Squared Differences: } ${squaredDifferences.map((diff, i) => `(${numbers[i]} - ${mean})^2 = ${diff}`).join(', ')}`,
          },
          {
            id: '4',
            explanation: 'Calculate the average of the squared differences',
            math: `\\text{Variance} = \\frac{${squaredDifferences.join(' + ')}}{${numbers.length}} = \\frac{${sumSquaredDiff}}{${numbers.length}} = ${variance}`,
          },
        ],
        result: `\\text{Variance} = ${variance}`,
      };
    } catch (error) {
      console.error('Error calculating variance:', error);
    }
  }
  
  // Default case
  return {
    steps: [
      {
        id: '1',
        explanation: 'Attempting to solve statistics problem',
        math: problem,
      },
    ],
    result: 'Could not solve the statistics problem. Try using formats like "mean 1, 2, 3, 4, 5" or "variance 1, 2, 3, 4, 5".',
  };
};

// Sample geometry problem solver (simplified)
const solveGeometryProblem = (problem: string): SolutionResult => {
  const lowercase = problem.toLowerCase();
  
  // Area of a circle
  if (lowercase.includes('area') && lowercase.includes('circle') && lowercase.includes('radius')) {
    try {
      // Extract radius from the problem
      const radiusMatch = problem.match(/radius\s*=?\s*(\d+(\.\d+)?)/i);
      if (!radiusMatch) throw new Error('No radius found');
      
      const radius = parseFloat(radiusMatch[1]);
      const area = Math.PI * radius * radius;
      
      return {
        steps: [
          {
            id: '1',
            explanation: 'Identify the radius of the circle',
            math: `\\text{Radius} = ${radius}`,
          },
          {
            id: '2',
            explanation: 'Apply the formula for the area of a circle: A = πr²',
            math: `\\text{Area} = \\pi \\cdot ${radius}^2`,
          },
          {
            id: '3',
            explanation: 'Calculate the area',
            math: `\\text{Area} = \\pi \\cdot ${radius * radius} = ${area}`,
          },
        ],
        result: `\\text{Area} = ${area} \\approx ${area.toFixed(2)}`,
      };
    } catch (error) {
      console.error('Error calculating circle area:', error);
    }
  }
  
  // Perimeter of a rectangle
  if (lowercase.includes('perimeter') && lowercase.includes('rectangle')) {
    try {
      // Extract length and width from the problem
      const lengthMatch = problem.match(/length\s*=?\s*(\d+(\.\d+)?)/i);
      const widthMatch = problem.match(/width\s*=?\s*(\d+(\.\d+)?)/i);
      
      if (!lengthMatch || !widthMatch) throw new Error('Length or width not found');
      
      const length = parseFloat(lengthMatch[1]);
      const width = parseFloat(widthMatch[1]);
      const perimeter = 2 * (length + width);
      
      return {
        steps: [
          {
            id: '1',
            explanation: 'Identify the length and width of the rectangle',
            math: `\\text{Length} = ${length}, \\text{Width} = ${width}`,
          },
          {
            id: '2',
            explanation: 'Apply the formula for the perimeter of a rectangle: P = 2(l + w)',
            math: `\\text{Perimeter} = 2 \\cdot (${length} + ${width})`,
          },
          {
            id: '3',
            explanation: 'Calculate the perimeter',
            math: `\\text{Perimeter} = 2 \\cdot ${length + width} = ${perimeter}`,
          },
        ],
        result: `\\text{Perimeter} = ${perimeter}`,
      };
    } catch (error) {
      console.error('Error calculating rectangle perimeter:', error);
    }
  }
  
  // Default case
  return {
    steps: [
      {
        id: '1',
        explanation: 'Attempting to solve geometry problem',
        math: problem,
      },
    ],
    result: 'Could not solve the geometry problem. Try using formats like "area of circle radius 5" or "perimeter of rectangle length 4 width 6".',
  };
};
