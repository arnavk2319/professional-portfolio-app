import React from "react";

const readTheme = () => document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

// Light/dark switch: sets data-theme on <html> and remembers the choice (localStorage, best effort).
// Storage key "theme" and values "light"/"dark" match the pre-paint script in public/index.html.
export const ThemeToggle = () => {
    const [theme, setTheme] = React.useState(readTheme);
    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", next === "dark" ? "#140d26" : "#f6f2ff");
        try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
        setTheme(next);
    };
    return (
        <button type="button" className="art-theme-toggle" onClick={toggle} aria-pressed={theme === "dark"}>
            <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} aria-hidden="true"></i>
            <span className="art-theme-toggle-label">Dark theme</span>
        </button>
    );
};

export default ThemeToggle;
