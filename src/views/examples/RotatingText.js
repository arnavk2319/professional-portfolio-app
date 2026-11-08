import React from 'react';
import { useState, useEffect } from "react";

const texts = [
  "dashboards in Tableau and Power BI.",
  "SQL views on Amazon Redshift.",
  "reports that cut manual work.",
  "insights for franchise partners.",
];

export const RotatingText = () => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let typingSpeed = isDeleting ? 40 : 80;

    const handleTyping = () => {
      const fullText = texts[index];
      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index]);

  return (
    <div className="art-lg-text art-code mb-25">
      &lt;<i>code</i>&gt; I build{" "}
      <span className="txt-rotate">{displayText}</span>
      &lt;/<i>code</i>&gt;
    </div>
  );
};
