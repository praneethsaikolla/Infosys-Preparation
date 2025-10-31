import React, { useEffect } from "react";

interface FormulaProps {
  formula: string;
}

const Formula: React.FC<FormulaProps> = ({ formula }) => {

  useEffect(() => {
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, [formula]); // Re-render when formula changes

  return (
    <p>
      {"\\(" + formula + "\\)"}
    </p>
  );
};

export default Formula;
