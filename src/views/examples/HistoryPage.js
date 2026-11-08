import React from 'react';
import { PageLayout } from "components/PageLayout";
import experience from "data/experience";
import education from "data/education";
import skills from "data/skills";

const SectionTitle = ({ id, children }) => (
    <div className="art-section-title">
        <div className="art-title-frame">
            <h2 id={id} className="h4">{children}</h2>
        </div>
    </div>
);

function HistoryPage(){
    return(
        <PageLayout title="History | Sakshi" currentHref="/history" currentLabel="History">
            <div className="container-fluid">
                <div className="row p-60-0 p-lg-30-0 p-md-15-0">

                    <section className="col-lg-6" aria-labelledby="history-education">
                        <SectionTitle id="history-education">Education</SectionTitle>
                        <div className="art-timeline art-gallery">
                            {education.map((ed) => (
                                <article className="art-timeline-item" key={ed.school + ed.degree}>
                                    <div className="art-timeline-mark-light"></div>
                                    <div className="art-timeline-mark"></div>
                                    <div className="art-a art-timeline-content">
                                        <div className="art-card-header">
                                            <div className="art-left-side">
                                                <h3 className="h5">{ed.school}</h3>
                                                <div className="art-el-suptitle mb-15">{ed.degree}</div>
                                            </div>
                                        </div>
                                        {ed.location && <p style={{color: 'var(--ink)', fontSize: '12px'}}>{ed.location}</p>}
                                        {ed.coursework && <p><strong>Coursework:</strong> {ed.coursework}</p>}
                                    </div>
                                </article>
                            ))}
                        </div>

                        <div className="mt-30">
                            <SectionTitle id="history-skills">Skills</SectionTitle>
                            <div className="art-a art-timeline-content">
                                {skills.map((s) => (
                                    <div className="mb-15" key={s.group}>
                                        <h3 className="h5">{s.group}</h3>
                                        <ul>
                                            {s.items.map((item) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="col-lg-6" aria-labelledby="history-experience">
                        <SectionTitle id="history-experience">Work History</SectionTitle>
                        <div className="art-timeline">
                            {experience.map((job) => (
                                <article className="art-timeline-item" key={job.company + job.start}>
                                    <div className="art-timeline-mark-light"></div>
                                    <div className="art-timeline-mark"></div>
                                    <div className="art-a art-timeline-content">
                                        <div className="art-card-header">
                                            <div className="art-left-side">
                                                <h3 className="h5">{job.company}</h3>
                                                <div className="art-el-suptitle mb-15">{job.role}</div>
                                            </div>
                                            <div className="art-right-side">
                                                <span className="art-date">{job.start} - {job.end}</span>
                                            </div>
                                        </div>
                                        <ul>
                                            {job.bullets.map((b, i) => <li key={i}>{b}</li>)}
                                        </ul>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </PageLayout>
    );
}

export default HistoryPage;
