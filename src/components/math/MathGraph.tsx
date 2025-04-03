
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as math from 'mathjs';

interface MathGraphProps {
  equation: string;
  domain: [number, number];
}

const MathGraph = ({ equation, domain }: MathGraphProps) => {
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Parse the equation with mathjs
      const compiledEquation = math.compile(equation);
      
      // Generate data points
      const [min, max] = domain;
      const step = (max - min) / 100;
      const points = [];
      
      for (let x = min; x <= max; x += step) {
        try {
          const scope = { x };
          const y = compiledEquation.evaluate(scope);
          
          // Only add finite values
          if (Number.isFinite(y)) {
            points.push({ x, y });
          }
        } catch (evalError) {
          // Skip points that cause evaluation errors
        }
      }
      
      setData(points);
      setError(null);
    } catch (err) {
      console.error('Error plotting graph:', err);
      setError('Could not plot the equation. Please check the format.');
    }
  }, [equation, domain]);

  if (error) {
    return (
      <Card className="p-4 text-center text-destructive bg-destructive/10 h-40">
        {error}
      </Card>
    );
  }

  return (
    <Card className="p-4 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="x" 
            domain={domain} 
            type="number" 
            label={{ value: 'x', position: 'insideBottomRight', offset: -10 }} 
          />
          <YAxis 
            label={{ value: 'y', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            formatter={(value: number) => [value.toFixed(2), 'y']}
            labelFormatter={(label: number) => `x = ${label.toFixed(2)}`}
          />
          <Line
            type="monotone"
            dataKey="y"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MathGraph;
