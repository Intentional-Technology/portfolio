import React from "react";

interface CodeSnippetProps {
  top: number;
  left: number;
}

const CodeSnippet: React.FC<CodeSnippetProps> = ({ top, left }) => {
  return (
    <pre
      style={{
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        fontFamily: "Courier New, Courier, monospace",
        fontSize: "20px",
        color: "rgba(250,250,210,0.4)",
        zIndex: "-1",
        animation: "fade-in-out 5s ease-in-out infinite",
      }}
    >
      {`function Intentional() { return 'Software to help you save time!'; }`}
    </pre>
  );
};

export default CodeSnippet;
