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
      {`01010101010010100111101010101001011001100101`}
    </pre>
  );
};

export default CodeSnippet;
