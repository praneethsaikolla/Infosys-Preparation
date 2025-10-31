import { Fragment } from "react";
import { InlineMath, BlockMath } from "react-katex";

interface LatexTextProps {
  text: string;
}

/**
 * Renders mixed plain text and LaTeX ($...$ or $$...$$) using react-katex.
 */
const LatexText = ({ text }: LatexTextProps) => {
  if (!text) return null;

  const regex = /\$\$(.+?)\$\$|\$(.+?)\$/g;
  const parts: (string | { math: string; block: boolean })[] = [];

  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push({ math: match[1], block: true });
    } else if (match[2]) {
      parts.push({ math: match[2], block: false });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, i) => {
        if (typeof part === "string") return <Fragment key={i}>{part}</Fragment>;
        return part.block ? (
          <BlockMath key={i} math={part.math} />
        ) : (
          <InlineMath key={i} math={part.math} />
        );
      })}
    </>
  );
};

export default LatexText;
