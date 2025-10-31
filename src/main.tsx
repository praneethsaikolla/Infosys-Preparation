import { createRoot } from "react-dom/client";
import React, { useEffect } from "react";

const App = () => {
  const formula = `\\frac{\\text{Increase}}{100 + \\text{Increase}} \\times 100 = \\frac{25}{100+25} \\times 100 = \\frac{25}{125} \\times 100 = \\frac{1}{5} \\times 100 = 20\\%`;

  useEffect(() => {
    if ((window as any).MathJax) {
      (window as any).MathJax.typesetPromise();
    }
  }, []);

  return (
    <div>
      <h1>LaTeX Rendering Example</h1>
      <p>
        {"\\(" + formula + "\\)"}
      </p>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
