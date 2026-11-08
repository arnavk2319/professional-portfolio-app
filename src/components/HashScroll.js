import React from "react";
import { useLocation } from "react-router-dom";

const reduced = () => !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

export const scrollToHash = (hash) => {
    const id = decodeURIComponent((hash || "").replace(/^#/, ""));
    const el = id && document.getElementById(id);
    if (!el || typeof el.scrollIntoView !== "function") return false;
    el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth", block: "start" });
    return true;
};

// Scrolls to the #section in the URL on load, on route change and on hashchange.
export const HashScroll = () => {
    const location = useLocation();
    React.useEffect(() => { scrollToHash(location.hash); }, [location.hash, location.pathname]);
    React.useEffect(() => {
        const onHash = () => scrollToHash(window.location.hash);
        window.addEventListener("hashchange", onHash);
        return () => window.removeEventListener("hashchange", onHash);
    }, []);
    return null;
};

export default HashScroll;
