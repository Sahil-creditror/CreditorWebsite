"use client";
import React from "react";
import "./ripple.css"; // external CSS

const RippleBackground: React.FC = () => {
  const circles = [
    { size: "xxlarge", shade: "shade1" },
    { size: "xlarge", shade: "shade2" },
    { size: "large", shade: "shade3" },
    { size: "medium", shade: "shade4" },
    { size: "small", shade: "shade5" },
  ];

  return (
    <div className="ripple-background">
      {circles.map((c, index) => (
        <div key={index} className={`circle ${c.size} ${c.shade}`} />
      ))}
    </div>
  );
};

export default RippleBackground;
