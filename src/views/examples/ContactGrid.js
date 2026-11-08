import React from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import defaultProfile from "data/profile";

const tileStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "16px",
  borderRadius: "12px",
  backgroundColor: "var(--bg-tile)",
  color: "var(--ink)",
  textDecoration: "none",
  boxShadow: "0 2px 6px var(--shadow-30)",
  fontSize: "14px",
  fontWeight: "500",
  flex: "1 1 220px",
  boxSizing: "border-box",
  wordBreak: "break-word",
};

// Tiles are built from profile data only. LinkedIn renders only when a URL is set.
export const ContactGrid = ({ profile = defaultProfile }) => {
  const tiles = [
    { key: "email", icon: <FaEnvelope size={20} aria-hidden="true" />, label: "Email", text: profile.email, href: "mailto:" + profile.email },
    { key: "phone", icon: <FaPhone size={20} aria-hidden="true" />, label: "Phone", text: profile.phone, href: "tel:" + profile.phone.replace(/[^+\d]/g, "") },
    { key: "location", icon: <FaMapMarkerAlt size={20} aria-hidden="true" />, label: "Location", text: profile.location },
  ];
  if (profile.linkedin) {
    tiles.push({ key: "linkedin", icon: <FaLinkedin size={20} aria-hidden="true" />, label: "LinkedIn", text: "LinkedIn profile", href: profile.linkedin, external: true });
  }

  return (
    <ul
      className="contact-grid"
      style={{ display: "flex", flexWrap: "wrap", gap: "15px", listStyle: "none", margin: "0 0 30px", padding: 0 }}
    >
      {tiles.map(({ key, icon, label, text, href, external }) => (
        <li key={key} style={{ display: "flex", flex: "1 1 220px" }}>
          {href ? (
            <a
              href={href}
              style={tileStyle}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {icon}
              <span><strong>{label}:</strong> {text}</span>
            </a>
          ) : (
            <div style={tileStyle}>
              {icon}
              <span><strong>{label}:</strong> {text}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactGrid;
