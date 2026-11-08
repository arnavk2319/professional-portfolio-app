import React from "react";
import { FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import defaultProfile from "data/profile";

// Tiles are built from profile data only. LinkedIn renders only when a URL is set.
export const ContactGrid = ({ profile = defaultProfile }) => {
  const tiles = [
    { key: "email", icon: <FaEnvelope size={20} aria-hidden="true" />, label: "Email", text: profile.email, href: "mailto:" + profile.email },
    { key: "phone", icon: <FaPhone size={20} aria-hidden="true" />, label: "Phone", text: profile.phone, href: "tel:" + profile.phone.replace(/[^+\d]/g, "") },
    { key: "location", icon: <FaMapMarkerAlt size={20} aria-hidden="true" />, label: "Location", text: profile.location },
  ];
  if (profile.linkedin) {
    tiles.push({ key: "linkedin", icon: <FaLinkedin size={20} aria-hidden="true" />, label: "LinkedIn", text: profile.linkedin.replace(/\/+$/, "").split("/").pop(), href: profile.linkedin, external: true });
  } else {
    tiles.push({ key: "linkedin", icon: <FaLinkedin size={20} aria-hidden="true" />, label: "LinkedIn", placeholder: "Add link" });
  }

  return (
    <ul className="contact-grid">
      {tiles.map(({ key, icon, label, text, href, external, placeholder }) => (
        <li key={key}>
          {href ? (
            <a
              href={href}
              className="contact-tile"
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {icon}
              <span><strong>{label}:</strong> {text}</span>
            </a>
          ) : (
            <div className="contact-tile">
              {icon}
              <span><strong>{label}:</strong> {placeholder ? <span className="ed-placeholder">{placeholder}</span> : text}</span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ContactGrid;
