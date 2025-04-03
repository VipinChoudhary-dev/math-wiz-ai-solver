
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface MathDisplayProps {
  math: string;
  inline?: boolean;
  className?: string;
}

const MathDisplay = ({ math, inline = false, className = '' }: MathDisplayProps) => {
  // Handle error gracefully
  try {
    return inline ? (
      <InlineMath math={math} className={className} />
    ) : (
      <BlockMath math={math} className={className} />
    );
  } catch (error) {
    console.error('KaTeX rendering error:', error);
    return (
      <div className="text-destructive p-2 border border-destructive/20 rounded bg-destructive/10">
        Error rendering math: {math}
      </div>
    );
  }
};

export default MathDisplay;
