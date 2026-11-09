import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import profile from "data/profile";
import ContactGrid from "components/ContactGrid";
import { Sparkline } from "components/DataViz";
import photo from "assets/img/profile.jpg";

// Always-visible profile pane on wide screens; a slide-in drawer on phones.
// The drawer closes on a click outside it, on Escape, and when a link inside it is chosen.
export const Sidebar = () => {
    const [open, setOpen] = React.useState(false);
    const paneRef = React.useRef(null);
    const toggleRef = React.useRef(null);

    React.useEffect(() => {
        if (!open) return undefined;
        const onDown = (e) => {
            const t = e.target;
            if (paneRef.current && paneRef.current.contains(t)) return;
            if (toggleRef.current && toggleRef.current.contains(t)) return;
            setOpen(false);
        };
        const onKey = (e) => {
            if (e.key === "Escape") {
                setOpen(false);
                if (toggleRef.current) toggleRef.current.focus();
            }
        };
        document.addEventListener("mousedown", onDown);
        document.addEventListener("touchstart", onDown);
        document.addEventListener("keydown", onKey);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("touchstart", onDown);
            document.removeEventListener("keydown", onKey);
        };
    }, [open]);

    return (
        <>
            <button
                type="button"
                ref={toggleRef}
                className="ed-sidebar-toggle"
                aria-expanded={open}
                aria-controls="contact"
                onClick={() => setOpen((o) => !o)}
            >
                {open ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
                <span className="art-sr-only">{open ? "Close profile and contact panel" : "Open profile and contact panel"}</span>
            </button>
            <div className={"ed-sidebar-backdrop" + (open ? " is-open" : "")} aria-hidden="true" />
            <aside
                id="contact"
                ref={paneRef}
                className={"ed-sidebar" + (open ? " is-open" : "")}
                aria-label="Profile and contact"
                onClick={(e) => { if (e.target.closest("a")) setOpen(false); }}
            >
                <div className="ed-profile">
                    <img className="ed-photo" src={photo} width="160" height="160" alt={"Portrait of " + profile.name} />
                    <p className="ed-profile-name">{profile.name}</p>
                    <p className="ed-profile-title">{profile.title}</p>
                    <Sparkline />
                    <ul className="ed-facts">
                        <li><span>Location</span> {profile.location}</li>
                        {profile.age ? <li><span>Age</span> {profile.age}</li> : null}
                    </ul>
                </div>
                <ContactGrid profile={profile} />
                <a href={profile.resumeUrl} download className="ed-btn ed-btn-block">Download resume</a>
            </aside>
        </>
    );
};

export default Sidebar;
