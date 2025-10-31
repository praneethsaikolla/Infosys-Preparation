import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface MathComponentProps {
  content: string;
  inline?: boolean;
}

export const MathComponent = ({ content, inline = false }: MathComponentProps) => {
  if (!content) return null;

  // Check if content contains LaTeX math
  const hasInlineMath = /\$[^$]+\$/g.test(content);
  const hasDisplayMath = /\$\$[^$]+\$\$/g.test(content);

  // Replace inline math: $...$ with KaTeX inline math
  if (hasInlineMath && !hasDisplayMath) {
    const parts = content.split(/(\$[^$]+\$)/g);
    return (
      <span>
        {parts.map((part, index) => {
          if (part.match(/\$[^$]+\$/)) {
            const math = part.slice(1, -1);
            return <InlineMath key={index} math={math} />;
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  }

  // Replace display math: $$...$$ with KaTeX display math
  if (hasDisplayMath) {
    const parts = content.split(/(\$\$[^$]+\$\$)/g);
    return (
      <div>
        {parts.map((part, index) => {
          if (part.match(/\$\$[^$]+\$\$/)) {
            const math = part.slice(2, -2);
            return <BlockMath key={index} math={math} />;
          }
          return (
            <span key={index}>
              {part}
              {index < parts.length - 1 && <br />}
            </span>
          );
        })}
      </div>
    );
  }

  // If no math found, return plain text
  return <span>{content}</span>;
};

export default MathComponent;
