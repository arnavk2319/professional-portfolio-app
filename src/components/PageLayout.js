import React from "react";
import { Sidebar } from "components/Sidebar";
import { MenuBar } from "components/MenuBar";

/**
 * Shared page shell: profile sidebar, hero background, scroll frame, footer and menu bar.
 * Each page passes only its own content as children.
 */
export const PageLayout = ({ title, currentHref, currentLabel, children }) => {
    React.useEffect(() => {
        document.title = title;
    }, [title]);

    const [artActiveInfoBar, setArtActiveInfoBar] = React.useState(false);
    const [artActiveMenuBar, setArtActiveMenuBar] = React.useState(false);

    // Only one side panel is open at a time; opening one closes the other.
    const toggleInfoBar = () => {
        setArtActiveMenuBar(false);
        setArtActiveInfoBar(!artActiveInfoBar);
    };
    const toggleMenuBar = () => {
        setArtActiveInfoBar(false);
        setArtActiveMenuBar(!artActiveMenuBar);
    };
    const closeAll = () => {
        setArtActiveInfoBar(false);
        setArtActiveMenuBar(false);
    };

    // Tapping outside an open panel (the dimmed page) or pressing Escape closes it.
    React.useEffect(() => {
        const onKey = (e) => e.key === "Escape" && closeAll();
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const scrollToTop = (e) => {
        e.preventDefault();
        const frame = document.getElementById("scrollbar");
        if (!frame) return;
        const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        frame.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    const contentClass = ["art-content", artActiveMenuBar && "art-active", artActiveInfoBar && "art-dim"]
        .filter(Boolean)
        .join(" ");

    return (
        <>
            <div className="art-app">
                <div className="art-mobile-top-bar"></div>

                <div className="art-app-wrapper">
                    <div className="art-app-container">
                        <Sidebar isActive={artActiveInfoBar} onToggle={toggleInfoBar} />

                        <div className={contentClass}>
                            <div className="art-curtain" onClick={closeAll}></div>

                            <div className="art-top-bg" style={{ backgroundImage: "url(" + require("assets/img/bg11.webp") + ")" }}>
                                <div className="art-top-bg-overlay"></div>
                            </div>

                            <div className="transition-fade" id="swup">
                                <div id="scrollbar" tabIndex="-1" className="art-scroll-frame" style={{ outline: "none" }}>
                                    <div className="scroll-content" style={{ transform: "translate3d(0px, 0px, 0px)" }}>
                                        {children}

                                        <div className="container-fluid">
                                            <footer>
                                                <div>© {new Date().getFullYear()} Arnav Kaushal</div>
                                                <a href="#." className="art-to-top" onClick={scrollToTop} aria-label="Scroll to top">
                                                    <i className="fas fa-chevron-up"></i> Back to top
                                                </a>
                                            </footer>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <MenuBar
                            isActive={artActiveMenuBar}
                            onToggle={toggleMenuBar}
                            currentHref={currentHref}
                            currentLabel={currentLabel}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
