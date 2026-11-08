import React from "react";

// Sticky index of the page sections. Plain #anchors work without JavaScript; the active section is
// tracked with IntersectionObserver (skipped where it does not exist) and marked with aria-current.
export const SECTIONS = [
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

export const SectionIndex = () => {
    const [active, setActive] = React.useState(SECTIONS[0].id);

    React.useEffect(() => {
        if (typeof window === "undefined" || typeof window.IntersectionObserver !== "function") return undefined;
        const visible = new Set();
        const io = new window.IntersectionObserver((entries) => {
            entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
            const first = SECTIONS.find((s) => visible.has(s.id));
            if (first) setActive(first.id);
        }, { rootMargin: "-20% 0px -55% 0px", threshold: 0 });
        SECTIONS.forEach((s) => {
            const el = document.getElementById(s.id);
            if (el) io.observe(el);
        });
        return () => io.disconnect();
    }, []);

    return (
        <nav className="ed-index" aria-label="Sections">
            <ul>
                {SECTIONS.map((s) => (
                    <li key={s.id}>
                        <a href={"#" + s.id} onClick={() => setActive(s.id)} {...(active === s.id ? { "aria-current": "true" } : {})}>{s.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default SectionIndex;
