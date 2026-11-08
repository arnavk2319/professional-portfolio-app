import React from "react";
import { SiCredly } from "react-icons/si";
import { FaDatabase, FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const buttons = [
  { icon: <FaDatabase size={20} />, label: "Kaggle", link: "https://www.kaggle.com/arnavkaushal/code" },
  { icon: <FaGithub size={20} />, label: "GitHub", link: "https://github.com/arnavk2319?tab=repositories" },
  { icon: <SiCredly size={20} />, label: "Credly", link: "https://www.credly.com/users/arnav-kaushal/badges/credly" },
  { icon: <FaLinkedin size={20} />, label: "LinkedIn", link: "https://www.linkedin.com/in/arnav-k-7359b3170/" },
  { icon: <FaEnvelope size={20} />, label: "Email", link: "mailto:arnav.kaushal800@gmail.com" },
];

export const ContactGrid = () => {
  return (
    <div
      style={{
        // Flex + centred wrapping: with an odd number of tiles the last one sits in the middle of its row.
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "15px",
        padding: "30px",
        margin: "0 auto 30px",
        width: "100%",           // full width container
        maxWidth: "500px",       // max width so it doesn’t stretch too much
        backgroundColor: "var(--bg-grid)",
        borderRadius: "12px",
        boxSizing: "border-box",
      }}
    >
      {buttons.map(({ icon, label, link }, index) => (
        <a
          key={index}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "16px",
            borderRadius: "12px",
            backgroundColor: "var(--bg-tile)",
            color: "var(--ink)",
            textDecoration: "none",
            cursor: "pointer",
            boxShadow: "0 2px 6px var(--shadow-30)",
            transition: "background-color 0.3s ease",
            fontSize: "14px",
            fontWeight: "500",
            userSelect: "none",
            flex: "0 1 calc(50% - 8px)",
            minWidth: "140px",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-tile-hover)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-tile-rest)")}
        >
          {icon}
          <span>{label}</span>
        </a>
      ))}
    </div>
  );
};

export default ContactGrid;
