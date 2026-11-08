import React from "react";

const readTheme = () => document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

// Light/dark switch: sets data-theme on <html> and remembers the choice (localStorage, best effort).
const ThemeToggle = () => {
    const [theme, setTheme] = React.useState(readTheme);
    const toggle = () => {
        const next = theme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", next === "dark" ? "#0f172a" : "#f8fafc");
        try { localStorage.setItem("theme", next); } catch (e) { /* storage unavailable */ }
        setTheme(next);
    };
    return (
        <button type="button" className="art-theme-toggle" onClick={toggle} aria-pressed={theme === "dark"}>
            <i className={theme === "dark" ? "fas fa-sun" : "fas fa-moon"} aria-hidden="true"></i>
            <span>{theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}</span>
        </button>
    );
};

const MENU = [
    { href: "/portfolio", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/history", label: "History" },
    { href: "/contact-me", label: "Contact" },
];

export const MenuBar = ({ isActive, onToggle, currentHref, currentLabel }) => (
    <div className={isActive ? "art-menu-bar art-active" : "art-menu-bar"}>
        <div className="art-menu-bar-frame">
            <div className="art-menu-bar-header">
                <a className={isActive ? "art-menu-bar-btn art-active" : "art-menu-bar-btn"} href="#." onClick={onToggle}>
                    &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;<i className="fas fa-bars"></i>
                </a>
            </div>

            <div className="art-current-page">
                <a href={currentHref}>{currentLabel}</a>
            </div>

            <div className="art-scroll-frame-menu-sidebar">
                <nav id="swupMenu">
                    <ul className="main-menu">
                        {MENU.map(({ href, label }) => (
                            <li className="menu-item" key={href}><a href={href}>{label}</a></li>
                        ))}
                    </ul>
                </nav>

                <ThemeToggle />

                <ul className="art-language-change">
                    <li className="art-active-lang"><a href="#.">EN</a></li>
                </ul>
            </div>
        </div>
    </div>
);
