import React from "react";
import Resume from "assets/img/Arnav_Kaushal_2025_ML.pdf";

const ACCENT = "var(--accent)";

// Born May 31, 1996. The age is worked out from today's date so it never goes stale.
const BIRTH = { year: 1996, month: 4, day: 31 }; // month is 0-based (4 = May)

const getAge = (now = new Date()) => {
    let age = now.getFullYear() - BIRTH.year;
    const hadBirthday =
        now.getMonth() > BIRTH.month || (now.getMonth() === BIRTH.month && now.getDate() >= BIRTH.day);
    return hadBirthday ? age : age - 1;
};

const PROFILE = [
    { label: "Residence:", value: "Canada" },
    { label: "City:", value: "Toronto" },
    { label: "Age:", value: String(getAge()) },
];

const LANGUAGES = ["English", "Hindi"];

// `bar` is the drawn width (%), `label` is the text shown next to it.
// NOTE: the last entry has always drawn an 80% bar with a "90 %" label.
const SKILLS = [
    { name: "Python, FastAPI, pytest", bar: 90, label: "90 %" },
    { name: "TypeScript, Javascript (ES6)", bar: 80, label: "80 %" },
    { name: "Machine Learning, Data Science", bar: 75, label: "75 %" },
    { name: "Data Structures and Algorithms", bar: 70, label: "70 %" },
    { name: "Java, Spring Boot, Spring MVC", bar: 90, label: "90 %" },
    { name: "Vue 2+, Angular 20+, React.js, Node.js", bar: 80, label: "80 %" },
    { name: "SQL, NoSQL, ORM, ODM", bar: 80, label: "90 %" },
    { name: "Agentic AI, Agentic SDLC", bar: 80, label: "80 %" },
    { name: "RAG, Agentic RAG, Vector Search", bar: 80, label: "80 %" },
    { name: "Automated AI Pipelines", bar: 75, label: "75 %" },
    { name: "Evals & Performance Metrics", bar: 75, label: "75 %" },
];

const KNOWLEDGE = [
    "Bootstrap, Materialize, Sass, Less",
    "Jest, Jasmine Testing",
    "Gulp, Webpack, Grunt",
    "Git, GitLab CI/CD",
    "Data Engineering, Analysis & Modeling",
    "Machine Learning, MLOps & AI Engineering",
    "LLM Apps, Agent Frameworks, Prompt Engineering",
];

const SOCIAL = [
    { href: "https://www.linkedin.com/in/arnav-k-7359b3170/", icon: "fab fa-linkedin-in" },
    { href: "https://github.com/arnavk2319?tab=repositories", icon: "fab fa-github" },
    { href: "mailto:arnav.kaushal800@gmail.com", icon: "fa fa-envelope" },
];

const CIRCLE_PATH = "M 50,50 m 0,-46.5 a 46.5,46.5 0 1 1 0,93 a 46.5,46.5 0 1 1 0,-93";

export const Sidebar = ({ isActive, onToggle }) => {
    // Skill bars start empty and grow to their percentage once the page has painted.
    const [filled, setFilled] = React.useState(false);
    React.useEffect(() => {
        const t = setTimeout(() => setFilled(true), 150);
        return () => clearTimeout(t);
    }, []);

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

            <a href="/portfolio" className="art-header" aria-label="Arnav Kaushal, home">
                <div className="art-avatar">
                    <div style={{ backgroundImage: "url(" + require("assets/img/default-avatar.png") + ")" }} className="art-avatar-curtain">
                        <img style={{ backgroundImage: "url(" + require("assets/img/default-avatar.png") + ")" }} alt="" />
                    </div>
                </div>

                <h5 className="art-name mb-10">
                    <span>Arnav Kaushal</span>
                </h5>

                <div className="art-sm-text">
                    AI Engineer, Full Stack Software Engineer
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

                <div className="art-ls-divider"></div>

                <div className="art-lang-skills p-30-0">
                    {LANGUAGES.map((language, i) => (
                        <div className="art-lang-skills-item" key={language}>
                            <div id={"circleprog" + (i + 1)} className="art-cirkle-progress">
                                <svg viewBox="0 0 100 100" style={{ display: "block", width: "100%" }}>
                                    <path d={CIRCLE_PATH} stroke="#eee" strokeWidth="7" fillOpacity="0"></path>
                                    <path className="art-circle-fill" d={CIRCLE_PATH} pathLength="100" stroke="#555" strokeWidth="7" fillOpacity="0" style={{ strokeDasharray: 100, strokeDashoffset: filled ? 0 : 100 }}></path>
                                </svg>
                                <div className="progressbar-text" style={{ position: "relative", left: "50%", top: "-32px", padding: "0px", margin: "0px", color: "var(--ink)" }}>100</div>
                            </div>
                            <h6 style={{ marginTop: "-20px" }}>{language}</h6>
                        </div>
                    ))}
                </div>

                <div className="art-ls-divider2"></div>

                <div className="art-hard-skills p-30-15">
                    {SKILLS.map(({ name, bar, label }, i) => (
                        <div className="art-hard-skills-item" key={name}>
                            <div className="art-skill-heading">
                                <h6>{name}</h6>
                            </div>
                            <div className="art-line-progress">
                                <div id={"lineprog" + (i + 1)} style={{ position: "relative" }}>
                                    <svg viewBox="0 0 100 1.72" preserveAspectRatio="none" style={{ width: (filled ? bar : 0) + "%", height: "100%", backgroundColor: ACCENT }}></svg>
                                    <div className="progressbar-text" style={{ position: "absolute", left: "50%", top: "50%", padding: "0px", margin: "0px", transform: "translate(-50%, -50%)", color: "rgba(85, 85, 85)" }}>{label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="art-ls-divider3"></div>

                <ul className="art-knowledge-list p-15-0">
                    {KNOWLEDGE.map(item => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>

                <div className="art-ls-divider4"></div>

                <div className="art-links-frame p-15-15">
                    <a href={Resume} target="_blank" rel="noopener noreferrer" className="art-link" download>Download cv <i className="fas fa-download"></i></a>
                </div>

                <div className={moreBelow ? "art-scroll-hint art-show" : "art-scroll-hint"} aria-hidden="true">
                    <span>Scroll</span>
                    <i className="fas fa-chevron-down"></i>
                </div>
            </div>

            <div className="art-ls-social">
                {SOCIAL.map(({ href, icon }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"><i className={icon}></i></a>
                ))}
            </div>
        </div>
    </div>
);
};
