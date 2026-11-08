import React from "react";
import profile from "data/profile";
import skills from "data/skills";

const PROFILE = [
    { label: "Location:", value: profile.location },
    { label: "Email:", value: profile.email },
    { label: "Phone:", value: profile.phone },
];

const SOCIAL = [
    { href: "mailto:" + profile.email, icon: "fa fa-envelope", label: "Email" },
    ...(profile.linkedin ? [{ href: profile.linkedin, icon: "fa fa-linkedin", label: "LinkedIn" }] : []),
];

export const Sidebar = ({ isActive, onToggle }) => {
    // Show a "more below" fade + chevron until the visitor has scrolled to the bottom of the sidebar.
    const [moreBelow, setMoreBelow] = React.useState(true);
    const scrollerRef = React.useRef(null);
    const updateMore = React.useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        setMoreBelow(el.scrollTop + el.clientHeight < el.scrollHeight - 24);
    }, []);
    // The scrollbar darkens while the sidebar is being scrolled, then relaxes again.
    const scrollTimer = React.useRef(null);
    const handleScroll = () => {
        updateMore();
        const el = scrollerRef.current;
        if (!el) return;
        el.classList.add("art-scrolling");
        clearTimeout(scrollTimer.current);
        scrollTimer.current = setTimeout(() => el.classList.remove("art-scrolling"), 700);
    };
    React.useEffect(() => () => clearTimeout(scrollTimer.current), []);
    React.useEffect(() => {
        updateMore();
        window.addEventListener("resize", updateMore);
        return () => window.removeEventListener("resize", updateMore);
    }, [updateMore]);

    return (
    <div className={isActive ? "art-info-bar art-active" : "art-info-bar"}>
        <div className="art-info-bar-frame">
            <div className="art-info-bar-header">
                <a className="art-info-bar-btn" onClick={onToggle} href="#.">
                    <i className="fa fa-ellipsis-v"></i>
                </a>
            </div>

            <a href="/portfolio" className="art-header" aria-label={profile.name + ", home"}>
                <div className="art-avatar">
                    <div
                        className="art-avatar-curtain"
                        role="img"
                        aria-label={profile.name + " initials"}
                        style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", fontWeight: 700, color: "var(--accent)" }}
                    >
                        {profile.name.charAt(0)}
                    </div>
                </div>

                <h5 className="art-name mb-10">
                    <span>{profile.name}</span>
                </h5>

                <div className="art-sm-text">
                    {profile.title}
                    <br></br>
                </div>
            </a>

            <div id="scrollbar2" ref={scrollerRef} onScroll={handleScroll} className="art-scroll-frame-profile-sidebar" tabIndex="-1" style={{ outline: "none", display: "block", position: "relative" }}>
                <div className="art-table p-60-0">
                    <ul>
                        {PROFILE.map(({ label, value }) => (
                            <li key={label}>
                                <h6>{label}</h6><span>{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="art-buttons-frame p-15-0">
                    <a href={profile.resumeUrl} download className="art-btn art-btn-md"><span>Download resume</span></a>
                </div>

                <div className="art-ls-divider3"></div>

                <ul className="art-knowledge-list p-15-0">
                    {skills.map(({ group }) => (
                        <li key={group}>{group}</li>
                    ))}
                </ul>

                <div className="art-ls-divider4"></div>

                <div className={moreBelow ? "art-scroll-hint art-show" : "art-scroll-hint"} aria-hidden="true">
                    <span>Scroll</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>

            <div className="art-ls-social">
                {SOCIAL.map(({ href, icon, label }) => (
                    <a key={href} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"><i className={icon}></i></a>
                ))}
            </div>
        </div>
    </div>
);
};
