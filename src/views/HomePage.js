import React from "react";
import profile from "data/profile";
import metrics from "data/metrics";
import experience from "data/experience";
import projects from "data/projects";
import education from "data/education";
import skills from "data/skills";
import { SectionIndex } from "components/SectionIndex";
import { ThemeToggle } from "components/ThemeToggle";
import { HashScroll } from "components/HashScroll";
import ContactGrid from "components/ContactGrid";

const isWebUrl = (u) => /^https?:\/\//i.test(u || "");

// Headline from profile.headline with profile.headlineAccent set in italics.
const Headline = () => {
    const [before, ...rest] = profile.headline.split(profile.headlineAccent);
    if (!rest.length) return profile.headline;
    return <>{before}<em>{profile.headlineAccent}</em>{rest.join(profile.headlineAccent)}</>;
};

const Section = ({ id, title, children }) => (
    <section id={id} className="ed-section" aria-labelledby={id + "-title"}>
        <h2 id={id + "-title"}>{title}</h2>
        {children}
    </section>
);

const Placeholder = ({ children }) => <span className="ed-placeholder">{children}</span>;

export default function HomePage() {
    React.useEffect(() => { document.title = profile.name + " | " + profile.title; }, []);
    const skipToMain = (e) => {
        e.preventDefault();
        const main = document.getElementById("main-content");
        if (main) main.focus();
    };

    return (
        <>
            <a className="art-skip-link" href="#main-content" onClick={skipToMain}>Skip to main content</a>
            <HashScroll />
            <div className="ed-page">
                <header className="ed-header">
                    <span className="ed-tag">{profile.name} · {profile.title} · {profile.location}</span>
                </header>
                <SectionIndex />
                <main id="main-content" tabIndex="-1" className="ed-main">
                    <section id="summary" className="ed-section ed-hero" aria-labelledby="summary-title">
                        <h1 id="summary-title"><Headline /></h1>
                        <p className="ed-lede">{profile.summary}</p>
                        <ul className="art-kpi-list">
                            {metrics.map(({ value, label }) => (
                                <li key={label}>
                                    <span className="art-counter">{value}</span>
                                    <span className="art-kpi-label">{label}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="ed-actions">
                            <a href={profile.resumeUrl} download className="ed-btn">Download resume</a>
                            <a href="#contact" className="ed-link">Get in touch</a>
                        </div>
                    </section>

                    <Section id="experience" title="Experience">
                        <div className="ed-ledger">
                            {experience.map((job) => (
                                <article className="ed-role" key={job.company + job.start}>
                                    <span className="ed-date">{job.start} - {job.end}</span>
                                    <div>
                                        <h3>{job.role}, {job.company}</h3>
                                        <ul>{job.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Section>

                    <Section id="projects" title="Projects">
                        <div className="ed-ledger">
                            {projects.map((p) => (
                                <article className="ed-role" key={p.name}>
                                    <span className="ed-date">{p.role}</span>
                                    <div>
                                        <h3>{p.name}</h3>
                                        <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                                        <p className="ed-small">
                                            {isWebUrl(p.link)
                                                ? <a href={p.link} target="_blank" rel="noopener noreferrer">Project link</a>
                                                : <>Project link: <Placeholder>Add link</Placeholder></>}
                                        </p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Section>

                    <Section id="education" title="Education">
                        <div className="ed-ledger">
                            {education.map((ed) => (
                                <article className="ed-role" key={ed.school + ed.degree}>
                                    <span className="ed-date">{ed.location}</span>
                                    <div>
                                        <h3>{ed.school}</h3>
                                        <p>{ed.degree}</p>
                                        {ed.coursework && <p className="ed-small"><strong>Coursework:</strong> {ed.coursework}</p>}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </Section>

                    <Section id="skills" title="Skills">
                        <div className="ed-skills">
                            {skills.map((s) => (
                                <div className="ed-skill-group" key={s.group}>
                                    <h3>{s.group}</h3>
                                    <ul>{s.items.map((item) => <li key={item}>{item}</li>)}</ul>
                                </div>
                            ))}
                        </div>
                    </Section>

                    <Section id="contact" title="Contact">
                        <ContactGrid profile={profile} />
                        <a href={profile.resumeUrl} download className="ed-btn">Download resume</a>
                    </Section>
                </main>
                <footer className="ed-footer">
                    <div>© {new Date().getFullYear()} {profile.name}</div>
                    <a href="#summary">Back to top</a>
                </footer>
            </div>
            <ThemeToggle />
        </>
    );
}
