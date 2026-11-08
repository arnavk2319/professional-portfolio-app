import React from "react";

const MENU = [
    { href: "/portfolio", label: "Home" },
    { href: "/projects", label: "Portfolio" },
    { href: "/certifications", label: "Certifications" },
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

                <ul className="art-language-change">
                    <li className="art-active-lang"><a href="#.">EN</a></li>
                </ul>
            </div>
        </div>
    </div>
);
