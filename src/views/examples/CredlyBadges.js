import React from 'react';

export const CredlyBadges = ({ badges }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
        padding: "10px"
      }}
    >
      {badges.map((badge, index) => (
        <a
          key={index}
          href={badge.link}
          target="_blank"
          rel="noopener noreferrer"
          className="col-1"
          style={{
            textAlign: "center",
            flex: "1 1 150px",
            maxWidth: "200px",
            padding: "35px",
            marginLeft: "3px",
            marginRight: "3px",
            marginBottom: "5px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px var(--shadow-10)",
            backgroundColor: "#fff",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "var(--bg-tile)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 8px 20px var(--shadow-15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 8px var(--shadow-10)";
          }}
        >
          <img
            src={badge.image}
            alt={badge.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "150px",
              objectFit: "contain",
              marginBottom: "10px",
            }}
          />
          <div style={{ fontWeight: "bold" }}>{badge.title}</div>
        </a>
      ))}
    </div>
  );
};

export default CredlyBadges;

